import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameSheet from './GameSheet';
import ActionMenu from './ActionMenu';
import GameLog from '../messaging-components/GameLog';
import SuggestionLog from '../messaging-components/SuggestionLog';
import './Game.css';
import Grid from '@mui/material/Grid';

const Game = ({ hasGameStarted, socket, localPlayerName }) => {
    const [p, setP] = useState({});
    const [players, setPlayers] = useState([]);
    const isCurrentPlayer = p.name === localPlayerName;
    const [gameLogMessages, setGameLogMessages] = useState([]);
    const [suggestionLogMessages, setSuggestionLogMessages] = useState([]);
    
    useEffect(() => {
        socket.emit('setup', localPlayerName);
    }, [socket, localPlayerName])

    useEffect(() => {
        //Set the players state to the list of players in the lobby
        socket.on('firstRender', (players) => {
            setPlayers(players);
        });
        //

        //Set the current player state to the first player's turn
        socket.on('playerTurn', (player) => {
            setP(player);
        });

        //Update the players state when a player's position has changed
        socket.on('playersUpdated', (updatedPlayers) => {
            setPlayers(updatedPlayers);
        });
        //

        socket.on('updateGameLog', (action) => {
            setGameLogMessages([...gameLogMessages, ...action]);
        });

        //Remove user from list if they have disconnected
        return () => {
            socket.off('firstRender');
            socket.off('playerTurn');
            socket.off('playersUpdated');
            socket.off('updateGameLog');
        };
        //

    }, [socket, gameLogMessages]);

    //Handles the end of the player's turn. Emits a socket event to the server to update the current player.
    const handleTurnEnd = () => {
        socket.emit('completeTurn');
    };
    //

    const updatePlayerSuggestionLog = (suggestion) => {
        console.log(suggestion);
        console.log(players);
        setSuggestionLogMessages([...suggestionLogMessages, suggestion]);
    };

    return(
        <>
            {hasGameStarted ? (
                <>
                <Grid item xs={8} className='board-logs'>
                    <Grid container direction="column" spacing={1}>
                        <Grid item xs={12}>
                            <Board players={players}/>
                        </Grid>
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs={5}>
                                <GameLog actions={gameLogMessages}/>
                            </Grid>
                            <Grid item xs={7}>
                                <SuggestionLog suggestions={suggestionLogMessages}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4} className="action-sheet">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '75px'}}>
                        {isCurrentPlayer ? (
                            <ActionMenu socket={socket} currentPlayer={p} players={players} isDisabled={false} suggestionMade={updatePlayerSuggestionLog} endTurn={handleTurnEnd} />
                        ) : (
                            <ActionMenu currentPlayer={p} players={players} isDisabled={true} />
                        )}
                        <GameSheet />
                    </div>
                </Grid>
                </>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Game;
import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameSheet from './GameSheet';
import ActionMenu from './ActionMenu';
import GameLog from '../messaging-components/GameLog';
import SuggestionLog from '../messaging-components/SuggestionLog';
import ShowCardOnOverlay from '../overlay-components/ShowCardOnOverlay';
import './Game.css';
import Grid from '@mui/material/Grid';

const Game = ({ hasGameStarted, socket, localPlayerName, playerTurn }) => {
    const [p, setP] = useState({});
    const [players, setPlayers] = useState([]);
    const isCurrentPlayer = p.name === localPlayerName;
    const [gameLogMessages, setGameLogMessages] = useState([]);
    const [suggestionLogMessages, setSuggestionLogMessages] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentSuggestion, setCurrentSuggestion] = useState({});
    
    useEffect(() => {
        socket.emit('setup');
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
            playerTurn(player.name === localPlayerName);
        });

        //Update the players state when a player's position has changed
        socket.on('playersUpdated', (updatedPlayers) => {
            setPlayers(updatedPlayers);
        });
        //

        //Update the game log with the current player's actions
        socket.on('updateGameLog', (actions) => {
            setGameLogMessages(actions);
        });

        //Show the overlay when the current player is asked to show a card
        socket.on('playerShowSelect', (currentPlayer, nextPlayer, suggestion) => {
            if (nextPlayer.name === localPlayerName) {
                setShowOverlay(true);
                document.getElementById('overlay').style.display = 'block';
                setCurrentSuggestion(suggestion);            
            }
        });
        //

        //Update the suggestion log with the card that was shown to the current player
        socket.on('updateSuggestionLogWithShownCard', (player, card) => {
            if (suggestionLogMessages.length > 0 && player === localPlayerName) {
                const updatedMessages = [...suggestionLogMessages];
                updatedMessages[suggestionLogMessages.length - 1] = {
                    ...updatedMessages[suggestionLogMessages.length - 1],
                    shown: card,
                };
                setSuggestionLogMessages(updatedMessages);
            }
        });
        //

        //Remove user from list if they have disconnected
        return () => {
            socket.off('firstRender');
            socket.off('playerTurn');
            socket.off('playersUpdated');
            socket.off('updateGameLog');
            socket.off('playerShowSelect');
            socket.off('updateSuggestionLogWithShownCard');
        };
        //

    }, [socket, gameLogMessages, localPlayerName, playerTurn, suggestionLogMessages]);

    //Handles the end of the player's turn. Emits a socket event to the server to update the current player.
    const handleTurnEnd = () => {
        socket.emit('completeTurn');
    };
    //

    //Updates the game log with the current player's suggestion
    const updatePlayerSuggestionLog = (suggestion) => {
        setSuggestionLogMessages([...suggestionLogMessages, suggestion]);
    };
    //

    //Handles the case where the current player has a card that matches the current suggestion
    const updatePlayerSuggestionLogWithShownCard = (card) => {
        socket.emit('showUserCard', p.name, card);
        document.getElementById('overlay').style.display = 'none';
        setCurrentSuggestion({});
    }
    //

    //Handles the case where the current player does not have a card that matches the current suggestion
    const noCard = () => {
        socket.emit('noCard');
        document.getElementById('overlay').style.display = 'none';
        setCurrentSuggestion({});
    };
    //

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
                <div id="overlay" style={{display: 'none'}}>
                    { 
                        showOverlay ? (
                            <ShowCardOnOverlay players={players} localPlayerName={localPlayerName} currentSuggestion={currentSuggestion} updatePlayerSuggestionLogWithShownCard={updatePlayerSuggestionLogWithShownCard} noCard={noCard}/>
                        ) : ( <></> )
                    }
                </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default Game;
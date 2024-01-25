import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameSheet from './GameSheet';
import ActionMenu from './ActionMenu';
import './Game.css';

const Game = ({ hasGameStarted, socket, localPlayerName }) => {
    const [p, setP] = useState({});
    const [players, setPlayers] = useState([]);
    const isCurrentPlayer = p.name === localPlayerName;
    const [playerMessages, setPlayerMessages] = useState([]);
    
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

        socket.on('updatePlayerMessages', (playerMessages) => { 
            setPlayerMessages(playerMessages);
        });

        //Remove user from list if they have disconnected
        return () => {
            socket.off('playerTurn');
            socket.off('playersUpdated');
            socket.off('firstRender');
        };
        //

    }, [socket]);

    //Handles the end of the player's turn. Emits a socket event to the server to update the current player.
    const handleTurnEnd = () => {
        socket.emit('completeTurn');
    };
    //

    // updates the current player's position state (server side) based on the user's movement selection (client side) 
    const updatePlayerPosition = (player, newPosition) => {
        socket.emit('updatePlayerPosition', player, newPosition);
    };
    //

    return(
        <div>
            {hasGameStarted ? (
                <div className='game'>
                    <Board className="board" players={players}></Board>
                    <div>
                        <div>
                            {p.name}
                            <br/>
                            {p.character}
                            {/* To add user cards */}
                        </div>
                            {isCurrentPlayer ? (
                                <div style={{display:'flex', flexDirection: 'row'}}>
                                    <ActionMenu socket={socket} currentPlayer={p} players={players} isDisabled={false}/>
                                    <GameSheet/>
                                </div>
                            ) : (
                                <div style={{display:'flex', flexDirection: 'row'}}>
                                    <ActionMenu currentPlayer={p} players={players} isDisabled={true}/>
                                    <GameSheet/>
                                </div>
                            )
                            }
                        
                    </div>
                    {/* <div className='game messages'>
                        <p>Current Player's Turn: {p.name}</p>
                        <p>Current Player's Character: {p.character}</p>
                        <br/><br/>
                        <p>What Happened Last Turn:</p>
                        <p>Previous Player: {playerMessages.previousPlayer}</p>
                        <p>Previous Move: {playerMessages.previousMove}</p>
                    </div>
                    {isCurrentPlayer && (
                        <div>
                            <div>
                                <p>Current Position: {p.position}</p>
                                <p>Your Character: {p.character}</p>
                                <p>Possible Movements:</p>
                                {possibleMovements[p.position] && possibleMovements[p.position].map((position, index) => {
                                    const isPositionOccupied = players.some(player => player.position === position);
                                    return(
                                        <button key={index} disabled={isPositionOccupied} onClick={() => !isPositionOccupied && updatePlayerPosition(p, position)}>
                                            {position}
                                        </button>
                                    );                                    
                                })}
                            </div>

                            <br/>
                            <button onClick={handleTurnEnd}>End Turn</button>
                        </div>
                    )} */}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Game;
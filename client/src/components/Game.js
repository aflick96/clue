import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = ({ hasGameStarted, socket, localPlayerName }) => {
    const [p, setP] = useState({});
    const [players, setPlayers] = useState([]);
    const isCurrentPlayer = p.name === localPlayerName;
    
    const possibleMovements = {
        'hallway-study-hall': ['study', 'hall'],
        'hallway-hall-lounge': ['hall', 'lounge'],
        'hallway-study-library': ['study', 'library'],
        'hallway-hall-billiard': ['hall', 'billiard'],
        'hallway-lounge-dining': ['lounge', 'dining'],
        'hallway-library-billiard': ['library', 'billiard'],
        'hallway-billiard-dining': ['billiard', 'dining'],
        'hallway-library-conservatory': ['library', 'conservatory'],
        'hallway-billiard-ballroom': ['billiard', 'ballroom'],
        'hallway-dining-kitchen': ['dining', 'kitchen'],
        'hallway-conservatory-ballroom': ['conservatory', 'ballroom'],
        'hallway-ballroom-kitchen': ['ballroom', 'kitchen'],
        'study': ['kitchen', 'hallway-study-hall', 'hallway-study-library'],
        'hall': ['hallway-study-hall', 'hallway-hall-lounge', 'hallway-hall-billiard', 'hallway-hall-lounge'],
        'lounge': ['hallway-hall-lounge', 'hallway-lounge-dining', 'conservatory'],
        'library': ['hallway-study-library', 'hallway-library-billiard', 'hallway-library-conservatory'],
        'billiard': ['hallway-hall-billiard', 'hallway-library-billiard', 'hallway-billiard-dining', 'hallway-billiard-ballroom'],
        'dining': ['hallway-lounge-dining', 'hallway-billiard-dining', 'hallway-dining-kitchen'],
        'conservatory': ['lounge', 'hallway-library-conservatory', 'hallway-conservatory-ballroom'],
        'ballroom': ['hallway-billiard-ballroom', 'hallway-conservatory-ballroom', 'hallway-ballroom-kitchen'],
        'kitchen': ['hallway-dining-kitchen', 'hallway-ballroom-kitchen', 'study'],
    };
    
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
                <div>
                    <p>Current Player: {p.name}</p>
                    {isCurrentPlayer && (
                        <div>
                            <div>
                                <p>Current Position: {p.position}</p>
                                <p>Your Character: {p.character}</p>
                                <p>Possible Movements:</p>
                                {possibleMovements[p.position] && possibleMovements[p.position].map((position, index) => (
                                    <button key={index} onClick={() => updatePlayerPosition(p, position)}>{position}</button>
                                ))}
                            </div>

                            <br/>
                            <button onClick={handleTurnEnd}>End Turn</button>
                        </div>
                    )}
                    <Board players={players}></Board>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Game;
import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = ({ hasGameStarted, socket, localPlayerName, playerOne }) => {
    const [p, setP] = useState(playerOne);
    const isCurrentPlayer = p.name === localPlayerName;
    const [diceRolled, setDiceRolled] = useState(false);
    const [roll, setRoll] = useState();

    useEffect(() => {
        socket.on('playerTurn', (player) => {
            setP(player);
        });
        return () => {
            socket.off('playerTurn');
        };

    }, [socket]);

    const rollDice = () => {
        if(!diceRolled){
            setRoll(Math.floor(Math.random() * 6) + 1);
            setDiceRolled(true);
        }
        
    };
    const handleTurnEnd = () => {
        socket.emit('completeTurn');
        setRoll(null);
        setDiceRolled(false);
    };

    const [players, setPlayers] = useState([
        { id: 1, name: 'Miss Scarlet', color: 'red', position: 'hallway-hall-lounge' },
        { id: 2, name: 'Col. Mustard', color: 'yellow', position: 'hallway-lounge-dining' },
        { id: 3, name: 'Mrs. White', color: 'white', position: 'hallway-ballroom-kitchen' },
        { id: 4, name: 'Mr. Green', color: 'green', position: 'hallway-conservatory-ballroom' },
        { id: 5, name: 'Mrs. Peacock', color: 'blue', position: 'hallway-library-conservatory' },
        { id: 6, name: 'Prof. Plum', color: 'purple', position: 'hallway-study-library' },
    ]);

    return(
        <div>
            {hasGameStarted ? (
                <div>
                    <p>Current Player: {p.name}</p>
                    {isCurrentPlayer && (
                        <div>
                            
                            <button onClick={rollDice} disabled={diceRolled}>
                                {diceRolled? `Rolled: ${roll}` : 'Roll Dice'}
                            </button>
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
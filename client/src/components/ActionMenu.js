import React, { useState } from 'react';    
import './ActionMenu.css';

const ActionMenu = ({ socket, currentPlayer, players, isDisabled }) => {
    
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

    const characters = ["Miss Scarlet", "Prof. Plum", "Col. Mustard", "Mrs. Peacock", "Mr. Green", "Mrs. White"];    
    const weapons = ["Candlestick", "Dagger", "Lead Pipe", "Revolver", "Rope", "Wrench"]
    const rooms = ["Ballroom", "Billiard Room", "Conservatory", "Dining Room", "Hall", "Kitchen", "Library", "Lounge", "Study"]

    const [moveSelection, setMoveSelection] = useState(''); //state for the selected move

    //Update the selected move when the user selects a move from the dropdown
    const handleMoveSelection = (event) => {
        setMoveSelection(event.target.value);
    };
    //

    //Update the player's position when the user clicks the Go button then complete the turn
    const handleGoButtonClick = () => {
        socket.emit('updatePlayerPosition', currentPlayer, moveSelection);
        socket.emit('completeTurn');
    };
    //


    return (
        <div className="actionmenu">
            <div className="currentplayer">
                <p className='label'>Current Player</p>
                <p className='player name'>{currentPlayer.name}</p>
                <p className='player character'>{currentPlayer.character}</p>
            </div>        
            <div className='move'>
                <p className='label'>Actions</p>
                <p className='label-lvl-1'>Move</p>
                <select onChange={handleMoveSelection} disabled={isDisabled}>
                    <option value="">--</option>
                    {possibleMovements[currentPlayer.position] && possibleMovements[currentPlayer.position].map((position, index) => {
                        const isPositionOccupied = players.some(player => player.position === position);
                        if (isPositionOccupied) {
                            return(
                                <option disabled>{position}</option>
                            )
                        } else {
                            return(
                                <option>{position}</option>
                            )    
                        }
                    })}
                </select>
                <br/>
                <button className='button' onClick={handleGoButtonClick} disabled={isDisabled}>Go</button>
            </div>
            <div className='suggest'>
                <p className='label-lvl-1'>Suggest</p>
                <p className='label-lvl-2'>Suspect</p>
                <select disabled={isDisabled}>
                    <option value="">--</option>
                    {characters.map((character, index) =>
                        <option>{character}</option>
                    )}
                </select>
                <p className='label-lvl-2'>Weapon</p>
                <select disabled={isDisabled}>
                    <option value="">--</option>
                    {weapons.map((weapon, index) =>
                        <option>{weapon}</option>
                    )}
                </select>
                <br/>
                <button className='button' disabled={isDisabled}>Suggest</button>
            </div>
            <div className="accuse">
                <p className='label'>Accuse</p>
                <p className='label-lvl-2'>Suspect</p>
                <select disabled={isDisabled}>
                    <option value="">--</option>
                    {characters.map((character, index) =>
                        <option>{character}</option>
                    )};
                </select>
                <p className='label-lvl-2'>Weapon</p>
                <select disabled={isDisabled}>
                    <option value="">--</option>
                    {weapons.map((weapon, index) => 
                        <option>{weapon}</option>
                    )}
                </select>
                <p className='label-lvl-2'>Room</p>
                <select disabled={isDisabled}>
                    <option value="">--</option>
                    {rooms.map((room, index) =>
                        <option>{room}</option>
                    )}
                </select>
                <br/>
                <button className='button' disabled={isDisabled}>Accuse</button>
            </div>
            <button className='button' disabled={isDisabled}>End Turn</button>
        </div>
    );
};

export default ActionMenu;
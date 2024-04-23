import React, { useState, useEffect } from 'react';    
import './ActionMenu.css';
import AccusationEnsure from '../overlay-components/AccusationEnsure';

const ActionMenu = ({ socket, currentPlayer, players, isDisabled, suggestionMade, endTurn }) => {
    
    const possibleMovements = {
		'above-hallway-hall-lounge': ['hallway-hall-lounge'],
		'right-hallway-lounge-dining': ['hallway-lounge-dining'],
		'below-hallway-ballroom-kitchen': ['hallway-ballroom-kitchen'],
		'below-hallway-conservatory-ballroom': ['hallway-conservatory-ballroom'],
		'left-hallway-library-conservatory': ['hallway-library-conservatory'],
		'left-hallway-study-library': ['hallway-study-library'],
        'hallway-study-hall': ['Study', 'Hall'],
        'hallway-hall-lounge': ['Hall', 'Lounge'],
        'hallway-study-library': ['Study', 'Library'],
        'hallway-hall-billiard': ['Hall', 'Billiard Room'],
        'hallway-lounge-dining': ['Lounge', 'Dining Room'],
        'hallway-library-billiard': ['Library', 'Billiard Room'],
        'hallway-billiard-dining': ['Billiard Room', 'Dining Room'],
        'hallway-library-conservatory': ['Library', 'Conservatory'],
        'hallway-billiard-ballroom': ['Billiard Room', 'Ballroom'],
        'hallway-dining-kitchen': ['Dining Room', 'Kitchen'],
        'hallway-conservatory-ballroom': ['Conservatory', 'Ballroom'],
        'hallway-ballroom-kitchen': ['Ballroom', 'Kitchen'],
        'Study': ['Kitchen', 'hallway-study-hall', 'hallway-study-library'],
        'Hall': ['hallway-study-hall', 'hallway-hall-lounge', 'hallway-hall-billiard', 'hallway-hall-lounge'],
        'Lounge': ['hallway-hall-lounge', 'hallway-lounge-dining', 'Conservatory'],
        'Library': ['hallway-study-library', 'hallway-library-billiard', 'hallway-library-conservatory'],
        'Billiard Room': ['hallway-hall-billiard', 'hallway-library-billiard', 'hallway-billiard-dining', 'hallway-billiard-ballroom'],
        'Dining Room': ['hallway-lounge-dining', 'hallway-billiard-dining', 'hallway-dining-kitchen'],
        'Conservatory': ['Lounge', 'hallway-library-conservatory', 'hallway-conservatory-ballroom'],
        'Ballroom': ['hallway-billiard-ballroom', 'hallway-conservatory-ballroom', 'hallway-ballroom-kitchen'],
        'Kitchen': ['hallway-dining-kitchen', 'hallway-ballroom-kitchen', 'Study'],
    };

    const characters = ["Miss Scarlet", "Prof. Plum", "Col. Mustard", "Mrs. Peacock", "Mr. Green", "Mrs. White"];    
    const weapons = ["Candlestick", "Dagger", "Lead Pipe", "Revolver", "Rope", "Wrench"]
    const rooms = ["Ballroom", "Billiard Room", "Conservatory", "Dining Room", "Hall", "Kitchen", "Library", "Lounge", "Study"]

    const [moveSelection, setMoveSelection] = useState(''); //state for the selected move
    const [suggestionSuspectSelection, setSuggestionSuspectSelection] = useState(''); //state for the selected suggestion
    const [suggestionWeaponSelection, setSuggestionWeaponSelection] = useState(''); //state for the selected suggestion
    const [moveMade, setMoveMade] = useState(false); //state for whether a move has been made --> locks the move dropdown and go button until the player ends their turn
    const [suggestMade, setSuggestMade] = useState(false); //state for whether a suggestion has been made --> locks the suggestion dropdowns and suggest button until the player ends their turn
    const [suggestionDisproven, setSuggestionDisproven] = useState(false);
    const [showMoveMessage, setShowMoveMessage] = useState(false); //state for whether to show an alert message when the player has not selected a valid move
    const [showSuggestMessage, setShowSuggestMessage] = useState(false); //state for whether to show an alert message when the player has not selected a valid suggestion
    const [inRoom, setInRoom] = useState(false); //state for whether the player is in a room --> locks the suggestion dropdowns and suggest button until the player ends their turn
    const [accuseMade, setAccuseMade] = useState(false); //state for whether an accusation has been made --> locks the accusation dropdowns and accuse button until the player ends their turn
    const [accuseClicked, setAccuseClicked] = useState(false); //state for whether the player has clicked the accuse button
    const [showAccuseMessage, setShowAccuseMessage] = useState(false); //state for whether to show an alert message when the player has not selected a valid accusation
    const [accuseSuspectSelection, setAccuseSuspectSelection] = useState(''); //state for the selected accusation
    const [accuseWeaponSelection, setAccuseWeaponSelection] = useState(''); //state for the selected accusation
    const [accuseRoomSelection, setAccuseRoomSelection] = useState(''); //state for the selected accusation

    //Update the selected move when the user selects a move from the dropdown
    const handleMoveSelection = (event) => {
        setMoveSelection(event.target.value);
    };
    //

    useEffect(() => {
        socket.on('suggestionDisproven', (value) => { 
            setSuggestionDisproven(value);
        });
    })
    

    const handleGoButtonClick = () => {
        
        //If player has not selected a valid move, show an alert message
        if(moveSelection === '--' || moveSelection === ''){
            setShowMoveMessage(true);
            setTimeout(() => setShowMoveMessage(false), 2000);

        //Otherwise, emit a socket event to the server to update the player's position, 
        //set the movemade state to true, 
        //and set the inroom state to true if the player is in a room
        } else {
            socket.emit('updatePlayerPosition', currentPlayer, moveSelection);
            currentPlayer.position = moveSelection;
            setMoveMade(true);
            setSuggestMade(false);
            if (!moveSelection.includes('hallway-')) {
                setInRoom(true);
            } else {
                setInRoom(false);
            }
        }
        //
    };
    
    //Update the selected suspect suggestion when the user selects a suspect from the dropdown
    const handleSuspectSuggestionSelection = (event) => {
        setSuggestionSuspectSelection(event.target.value);
    };
    //

    //Update the selected weapon suggestion when the user selects a weapon from the dropdown
    const handleWeaponSuggestionSelection = (event) => {
        setSuggestionWeaponSelection(event.target.value);
    };
    //

    const handleSuggestButtonClick = () => {
        
        //If player has not selected a valid suggestion, show an alert message
        if(suggestionSuspectSelection === '--' || 
            suggestionSuspectSelection === '' ||
            suggestionWeaponSelection === '--' ||
            suggestionWeaponSelection === ''
        ) {
            setShowSuggestMessage(true);
            setSuggestionDisproven(false);
            setTimeout(() => setShowSuggestMessage(false), 2000);
        } 

        //Otherwise, emit a socket event to the server to update the game log with the suggestion
        //and emit a socket event to the server to update a suggested character's position if they are on the board
        else {
            socket.emit('makeSuggestion', {name: currentPlayer.name, player_character: currentPlayer.character, character: suggestionSuspectSelection, weapon: suggestionWeaponSelection, room: currentPlayer.position});
            suggestionMade({character: suggestionSuspectSelection, weapon: suggestionWeaponSelection, room: currentPlayer.position});
            setSuggestMade(true);
            players.forEach((p) => {
                if(p.character === suggestionSuspectSelection) {
                    socket.emit('updatePlayerPosition', p, currentPlayer.position);
                }
            });
        }
        //
    };

    const handleSuspectAccusationSelection = (event) => {
        setAccuseSuspectSelection(event.target.value);
    };

    const handleWeaponAccusationSelection = (event) => {
        setAccuseWeaponSelection(event.target.value);
    };

    const handleRoomAccusationSelection = (event) => {
        setAccuseRoomSelection(event.target.value);
    };

    const handleAccuseButtonClick = () => {
        if(accuseSuspectSelection === '--' ||
            accuseSuspectSelection === '' ||
            accuseWeaponSelection === '--' ||
            accuseWeaponSelection === '' ||
            accuseRoomSelection === '--' ||
            accuseRoomSelection === ''
        ) {
            setShowAccuseMessage(true);
            setTimeout(() => setShowAccuseMessage(false), 2000);
        }
        else {
            //Display a yes/no modal to confirm the accusation
            //setAccuseMade(true);
            //socket.emit('accusationClicked', {user: currentPlayer, character: accuseSuspectSelection, weapon: accuseWeaponSelection, room: accuseRoomSelection});
            setAccuseClicked(true);
        }
        
    };

    const handleAccuseButtonConfirm = (res) => {
        if(res) {
            socket.emit('makeAccusation', {user: currentPlayer, character: accuseSuspectSelection, weapon: accuseWeaponSelection, room: accuseRoomSelection});
            setAccuseMade(true);
        } else {
            setAccuseSuspectSelection('--');
            setAccuseWeaponSelection('--');
            setAccuseRoomSelection('--');
        }
        setAccuseClicked(false);
    };

    //Resets the state values to nothing when the player ends their turn
    const handleEndTurnButtonClick = () => {
        setMoveSelection('--');
        setMoveMade(false);
        setSuggestionSuspectSelection('--');
        setSuggestionWeaponSelection('--');
        endTurn();
    };
    //

    return (
        <>
        <div className="actionmenu">
            <div className="currentplayer">
                <p className='label'>Current Player</p>
                <p className='player name'>{currentPlayer.name}</p>
                <p className='player character'>{currentPlayer.character}</p>
            </div>        
            <div className='move'>
                <p className='label'>Actions</p>
                <p className='label-lvl-1'>Move</p>

                {showMoveMessage && (
                    <div className='alert-message'>
                        Please select an option.
                    </div>
                )}

                <select onChange={handleMoveSelection} value={moveSelection} disabled={isDisabled || moveMade || accuseMade}>
                    <option value="--">--</option>
                    {possibleMovements[currentPlayer.position] && possibleMovements[currentPlayer.position].map((position, index) => {
                        const isPositionOccupied = players.some(player => player.position === position && player.active === true);
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
                <button className='button' onClick={handleGoButtonClick} disabled={isDisabled || moveMade || accuseMade}>Go</button>
            </div>
            <div className='suggest'>
                <p className='label-lvl-1'>Suggest</p>
                <p className='label-lvl-2'>Suspect</p>

                {showSuggestMessage && (
                    <div className='alert-message'>
                        Please ensure you have selected a valid Suspect and Weapon.
                    </div>
                )}

                <select onChange={handleSuspectSuggestionSelection} value={suggestionSuspectSelection} disabled={isDisabled || suggestMade || !inRoom || accuseMade}>
                    <option value="--">--</option>
                    {characters.map((character, index) =>
                        <option>{character}</option>
                    )}
                </select>
                <p className='label-lvl-2'>Weapon</p>
                <select onChange={handleWeaponSuggestionSelection} value={suggestionWeaponSelection} disabled={isDisabled || suggestMade || !inRoom || accuseMade}>
                    <option value="--">--</option>
                    {weapons.map((weapon, index) =>
                        <option>{weapon}</option>
                    )}
                </select>
                <br/>
                <button className='button' onClick={handleSuggestButtonClick} disabled={isDisabled || suggestMade || !inRoom || accuseMade}>Suggest</button>
            </div>
            <div className="accuse">
                <p className='label'>Accuse</p>

                {showAccuseMessage && (
                    <div className='alert-message'>
                        Please ensure you have selected a valid Suspect, Weapon, and Room.
                    </div>
                )}

                <p className='label-lvl-2'>Suspect</p>
                <select onChange={handleSuspectAccusationSelection} disabled={isDisabled || suggestionDisproven || accuseMade}>
                    <option value="--">--</option>
                    {characters.map((character, index) =>
                        <option>{character}</option>
                    )};
                </select>

                <p className='label-lvl-2'>Weapon</p>
                <select onChange={handleWeaponAccusationSelection} disabled={isDisabled || suggestionDisproven || accuseMade}>
                    <option value="--">--</option>
                    {weapons.map((weapon, index) => 
                        <option>{weapon}</option>
                    )}
                </select>

                <p className='label-lvl-2'>Room</p>
                <select onChange={handleRoomAccusationSelection} disabled={isDisabled || suggestionDisproven || accuseMade}>
                    <option value="--">--</option>
                    {rooms.map((room, index) =>
                        <option>{room}</option>
                    )}
                </select>
                <br/>
                <button className='button' onClick={handleAccuseButtonClick} disabled={isDisabled || suggestionDisproven || accuseMade}>Accuse</button>
            </div>
            <button className='button' onClick={handleEndTurnButtonClick} disabled={isDisabled}>End Turn</button>
        </div>
        {
            accuseClicked && (
                <div id="overlay" style={{display: 'flex'}}>
                    <AccusationEnsure onYes={(res) => handleAccuseButtonConfirm(res)} onNo={(res) => handleAccuseButtonConfirm(res)}/>
                </div>
            )
        }
        </>
    );
};

export default ActionMenu;

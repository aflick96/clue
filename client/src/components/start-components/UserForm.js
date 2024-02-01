import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onJoinLobby, availableCharacters, socket }) => {
    const [name, setName] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        //Check if the username is already taken. If not, join the lobby
        socket.emit('getUsers', (users) => {
            let userExists = users.some(user => user.name === name);
            if (userExists) {
                alert('Username ' + name + ' is already taken.');
                return;
            } else {
                onJoinLobby({'name': name, 'character': selectedCharacter, 'color': null, 'ready': false, 'position': null, 'items': []});
            }
        });
    };
    
    return(
        <div className='userform'>
            <p>Welcome to Clue-less!</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br/>
                <br/>
                <select
                    id="character-select"
                    value={selectedCharacter}
                    onChange={(e) => setSelectedCharacter(e.target.value)}
                    required
                >
                    <option value="">--Select a character--</option>
                    {availableCharacters.map((character, index) => (
                        <option key={index} value={character}>{character}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <button type="submit">Enter Lobby</button>
            </form>
        </div>
    );
};

export default UserForm;
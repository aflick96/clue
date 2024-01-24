import React, { useState } from 'react';

const UserForm = ({ onJoinLobby, availableCharacters }) => {
    const [name, setName] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onJoinLobby({'name': name, 'character': selectedCharacter, 'color': null, 'ready': false, 'position': null});
    };
    
    return(
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
            <label htmlFor='character-select'>Choose a character:</label>
            <select
                id="character-select"
                value={selectedCharacter}
                onChange={(e) => setSelectedCharacter(e.target.value)}
                required
            >
                <option value="">--Please choose an option--</option>
                {availableCharacters.map((character, index) => (
                    <option key={index} value={character}>{character}</option>
                ))}
            </select>
            <br/>
            <br/>
            <button type="submit">Enter Lobby</button>
        </form>
    );
};

export default UserForm;
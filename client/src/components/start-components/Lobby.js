
const Lobby = ({ users, onUserStartGame }) => {
    return(
        <div>
            <h1>Lobby</h1>
            <ul>
                {users.map(user => (
                    <li key={user.name}>{user.name}     {user.character}    {user.ready === false ? 'false' : 'true'}</li>
                ))}
            </ul>
            <button onClick={onUserStartGame}>Join Game</button>
        </div>
    );
};

export default Lobby;
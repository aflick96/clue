import './Lobby.css';

const Lobby = ({ users, onUserStartGame }) => {
    return(
        <div className="lobby">
            <h1>Lobby</h1>
            <div className='players'>
                <div className='lobby-labels'>
                    <p>Player</p>
                    <p>Name</p>
                    <p>Character</p>
                    <p>Status</p>
                </div>
                {users.map((user, index) => (
                    <div key={user.name} className='player-row'>
                        <p style={{ fontWeight: 'bold'}}>Player {index + 1}</p>
                        <p>{user.name}</p>
                        <p>{user.character}</p>
                        <p>{user.ready === false ? 'Not ready' : 'Ready!'}</p>
                    </div>
                ))}
            </div>            
            <br/>
            <button onClick={onUserStartGame}>Join Game</button>
        </div>
    );
};

export default Lobby;
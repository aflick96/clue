import PlayerToken from './PlayerToken';

const Room = ({ name, players }) => {
    return (
        <div className='room'>
            <h3>{name}</h3>
            {players.map(player => (
                <PlayerToken key={player.id} {...player}/>
            ))}
        </div>
    );
};

export default Room;
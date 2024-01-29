import PlayerToken from './PlayerToken';

const Room = ({ name, players, corner }) => {    
    return (
        <div className='room'>
            <h3>{name}</h3>
            {players.map(player => (
                <PlayerToken key={player.name} className='room' {...player}/>
            ))}
            {corner && <Passage room={name}/>}
        </div>
    );
};

const Passage = ({ room }) => {
    return (
        <div className={`passage ${room}`}></div>
    );
};

export default Room;
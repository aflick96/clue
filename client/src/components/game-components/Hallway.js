import PlayerToken from './PlayerToken';

const Hallway = ({ occupiedBy, className }) => {
    return (
        <div className={`hallway ${occupiedBy ? 'occupied' : ''} ${className}`}>
            {occupiedBy && <PlayerToken {...occupiedBy} className={className} />}
        </div>
    );
};

export default Hallway;
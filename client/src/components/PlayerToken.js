
const PlayerToken = ({ color, className }) => {    
    return(
        <div className={`player-token ${color} ${className === 'horizontal-hallway' ? 'player-token-horizontal' : 'player-token-vertical'}`}></div>
    );
};

export default PlayerToken;
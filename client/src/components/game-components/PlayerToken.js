
const PlayerToken = ({ color, className, isCurrentPlayer, out }) => {    
    
    let styling;

    if(className === 'horizontal-hallway') {
        styling = out ? 'player-token-horizontal-out' : 'player-token-horizontal';
    } else if (className === 'vertical-hallway') {
        styling = out ? 'player-token-vertical-out' : 'player-token-vertical';
    } else if (className === 'room') {
        styling = 'player-token-room';
    }
    
    return(
        <div className={`player-token ${isCurrentPlayer ? "glow" : ""} ${color} ${styling}`}></div>
    );
};

export default PlayerToken;

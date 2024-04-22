
const PlayerToken = ({ color, className, isCurrentPlayer }) => {    
    
    let styling;

    if(className === 'horizontal-hallway') {
        styling = 'player-token-horizontal';
    } else if (className === 'vertical-hallway') {
        styling = 'player-token-vertical';
    } else if (className === 'room') {
        styling = 'player-token-room';
    }
    
    return(
        <div className={`player-token ${isCurrentPlayer ? "glow" : ""} ${color} ${styling}`}></div>
    );
};

export default PlayerToken;

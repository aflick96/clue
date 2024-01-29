import './GameLog.css';

const GameLog = ({ actions }) => {
    return(
        <div className='gamelog'>
            <p>Game Log</p>
            {actions.map((action, index) =>
                <div className='gamelog-message' key={index}>
                    <p>{action.timestamp}: {action.message}</p>
                </div>  
            )}
        </div>
    );
};

export default GameLog;
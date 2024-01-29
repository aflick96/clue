import './SuggestionLog.css';

const SuggestionLog = ({ suggestions }) => {
    return(
        <div className='suggestionlog'>
            <p>Suggestion Log</p>
            {suggestions.map((suggestion, index) =>
                <div className='suggestionlog-message' key={index}>
                    <p>{suggestion.character}</p>
                    <p>{suggestion.weapon}</p>
                    <p>{suggestion.room}</p>
                </div>  
            )}
        </div>
    );
};

export default SuggestionLog;
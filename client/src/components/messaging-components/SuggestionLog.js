import './SuggestionLog.css';
import Card from './../game-components/Card';

const SuggestionLog = ({ suggestions }) => {
    console.log(suggestions);
    return(
        <div className='suggestionlog'>
            <p>Suggestion Log</p>
            {suggestions.map((suggestion, index) =>
                <div className='suggestionlog-message' key={index}>
                    <Card image_name={suggestion.character} className={'suggestionlog-message'}/>
                    <Card image_name={suggestion.weapon} className={'suggestionlog-message'}/>
                    <Card image_name={suggestion.room} className={'suggestionlog-message'}/>
                    {
                        suggestion.shown ? (
                            <Card image_name={suggestion.shown} className={'suggestionlog-message-shown'}/>
                        ) : (
                            <Card image_name={'No Card Shown'} className={'suggestionlog-message-shown'}/>
                        )
                    }
                </div>  
            )}
        </div>
    );
};

export default SuggestionLog;
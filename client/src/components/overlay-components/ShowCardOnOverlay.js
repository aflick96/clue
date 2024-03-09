import React from 'react';
import Card from '../game-components/Card';

const ShowCardOnOverlay = (
    {players, localPlayerName, currentSuggestion, updatePlayerSuggestionLogWithShownCard, noCard}
) => {
    //Displays the card that the current player has that matches the current suggestion
    return(
        <>
        <div id="cards">
            {(() => {
                let cardFound = false;
                const cards = players.map((player, index) => {
                    if(player.name === localPlayerName){
                        return player.items.map((item, index) => {
                            if (item === currentSuggestion.character || item === currentSuggestion.room || item === currentSuggestion.weapon){
                                cardFound = true;
                                return(
                                    <Card image_name={item} className="overlay-suggestion" onClick={() => updatePlayerSuggestionLogWithShownCard(item, localPlayerName)}/>
                                );
                            }
                            return null;
                        });
                    }
                    return null;
                });
                if (!cardFound) {
                    return <button className="no-card-button" onClick={() => noCard(localPlayerName)}>No Card</button>
                } else {
                    return cards;
                }
            })()}
        </div>
        </>
    );
    //


};

export default ShowCardOnOverlay;
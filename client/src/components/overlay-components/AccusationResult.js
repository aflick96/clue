import React from 'react';
import LoserGif from '../../assets/Loser.gif';
import Mustard from '../../assets/Col. Mustard Winner.gif';
import Green from '../../assets/Mr. Green Winner.gif';
import Peacock from '../../assets/Mrs. Peacock Winner.gif';
import Plum from '../../assets/Prof. Plum Winner.gif';
import Scarlet from '../../assets/Miss Scarlet Winner.gif';
import White from '../../assets/Mrs. White Winner.gif';

//Map character names to their respective gifs
const characterGifs = {
    "Col. Mustard": Mustard,
    "Mr. Green": Green,
    "Mrs. Peacock": Peacock,
    "Prof. Plum": Plum,
    "Miss Scarlet": Scarlet,
    "Mrs. White": White,
};

const AccusationResult = ({accusation, playAgain}) => {

    //Get the gif for the winning character
    const winnerGif = characterGifs[accusation.character];

    return(
        <div className='accusation-result'>
        {
            accusation.result && (
                <div className='accusation-result-success'>
                    <div id="header">
                        <p style={{fontSize:'50px', margin: '0px'}}>WINNER WINNER</p>
                        <img src={winnerGif} alt='winner'></img>
                    </div>
                    <p>{accusation.user.name} won!!!!!</p>
                    <p>The correct answer was {accusation.character} with the {accusation.weapon} in the {accusation.room}</p>
                    <button onClick={playAgain} className='play-again'>Play again?</button>
                </div>
            )
        }
        {
            !accusation.result && (
                <div className='accusation-result-failure'>
                    <div id="header">
                        <p style={{fontSize:'50px'}}>WEEP WOMP</p>
                        <img src={LoserGif} alt='loser'></img>
                    </div>
                    
                    <p>{accusation.user.name} made an incorrect accusation!</p>
                    <p style={{fontSize: '12px', fontWeight: 'bold'}}>
                        {accusation.user.name} can only show cards for the remainder of the game.
                    </p>
                </div>
            )
        }
        </div>
    );
};

export default AccusationResult;
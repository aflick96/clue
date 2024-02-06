import React, { useState, useEffect } from 'react';
import Card from '../game-components/Card';
import Grid from '@mui/material/Grid';
import './GameHeader.css';

const GameHeader = ({
    users,
    user,
    notification
}) => {
    
    const [userName, setUserName] = useState();
    const [userCharacter, setUserCharacter] = useState();
    const [itemsRendered, setItemsRendered] = useState(false);
    const [userItems, setUserItems] = useState();
    const [showYourTurnMessage, setShowYourTurnMessage] = useState(false);

    useEffect(() => {
        
        //Sets the current player's name, character, and items to be displayed in the header
        users.forEach((u) => {
            if(u.name === user) {
                setUserName(u.name);
                setUserCharacter(u.character);
                if(u.items.length !== 0) {
                    setItemsRendered(true);
                    setUserItems(u.items);
                }
            }
        })
        //

        //Displays a message when it's the current player's turn
        setShowYourTurnMessage(notification);
        setTimeout(() => { setShowYourTurnMessage(false);}, 4000);
        //

    }, [users, user, notification]);
    

    //Chunks the user's items into groups of 3 to be displayed in the header
    const chunkArray = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };
    //

    return(
        <Grid container className='gameheader'>
            {
                itemsRendered ?
                <>
                    <Grid item sm={8} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h1 className='title'>Clue-less</h1>
                        {
                            showYourTurnMessage && (
                                <div className='alert-message-your-turn'>It's your turn!</div>
                            )
                        }
                        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0px', marginRight: '100px'}}>
                            <p className='user-name'>{userName}</p>
                            <Card image_name={userCharacter} className={'header-user-character'}/>
                        </Grid>
                    </Grid>             
                    <Grid item sm={4} className='user-information'>
                        <Grid container justifyContent="center">
                            {chunkArray(userItems, 3).map((rowItems, rowIndex) => (
                            <Grid container key={rowIndex} justifyContent="center">
                                {rowItems.map((item, index) => (
                                <Grid item xs={4} key={index} display="flex" justifyContent="center" alignItems="center">
                                    <Card image_name={item} className={'header-game-cards'} />
                                </Grid>
                                ))}
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </>
            :
                <></>
            }
        </Grid> 
    );
}

export default GameHeader;

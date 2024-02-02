import React, { useState, useEffect } from 'react';
import Card from '../game-components/Card';
import Grid from '@mui/material/Grid';
import './GameHeader.css';

const GameHeader = ({
    users,
    user
}) => {
    
    //Set's the current player's name, character, and items to be displayed in the header
    const [userName, setUserName] = useState();
    const [userCharacter, setUserCharacter] = useState();
    const [userItem1, setUserItem1] = useState();
    const [userItem2, setUserItem2] = useState();
    const [userItem3, setUserItem3] = useState();

    useEffect(() => {
        users.forEach((u) => {
            if(u.name === user) {
                setUserName(u.name);
                setUserCharacter(u.character);
                setUserItem1(u.items[0]);
                setUserItem2(u.items[1]);
                setUserItem3(u.items[2]);
            }
        })
    }, [users, user]);
    //


    return(
        <Grid container className='gameheader'>
            <Grid item sm={8} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <h1 className='title'>Clue-less</h1>
                <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0px', marginRight: '30px'}}>
                    <p className='user-name'>{userName}</p>
                    <Card image_name={userCharacter} className={'header-user-character'}/>
                </Grid>
            </Grid>
            {
                userItem1 && userItem2 && userItem3 ?             
                    <Grid item sm={4} className='user-information'>
                        <Card image_name={userItem1} className={'header-game-cards'}/>
                        <Card image_name={userItem2} className={'header-game-cards'}/>
                        <Card image_name={userItem3} className={'header-game-cards'}/>
                    </Grid>
            :
                <></>
            }
        </Grid> 
    );
}

export default GameHeader;

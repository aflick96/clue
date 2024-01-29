import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
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
            <Grid item sm={8}>
                <h1 className='title'>Clue-less</h1>    
            </Grid>
            <Grid item sm={4} className='user-information'>
                <Box className='user-identity' sx={{ display: 'flex', flexDirection: 'column'}}>
                    <p className='user-name'>{userName}</p>
                    <p className='user-character'>{userCharacter}</p>
                    <Box className='user-items' sx={{ display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <p>{userItem1}</p>
                        </div>
                        <div>
                            <p>{userItem2}</p>
                        </div>
                        <div>
                            <p>{userItem3}</p>
                        </div>
                    </Box>
                </Box>
            </Grid>
        </Grid> 
    );
}

export default GameHeader;

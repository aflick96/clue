import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import UserForm from './components/start-components/UserForm';
import Lobby from './components/start-components/Lobby';
import Game from './components/game-components/Game';
import GameHeader from './components/header-components/GameHeader';
import Grid from '@mui/material/Grid';

const ENDPOINT = "http://127.0.0.1:5000";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [playersReady, setPlayersReady] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);

  useEffect(() => {

    //Create new client socket & update state
    const clientSocket = socketIOClient(ENDPOINT);
    setSocket(clientSocket);
    //

    //Update the users in the lobby when the server emits an updated list
    clientSocket.on('updateLobby', (users) => {
      setUsersInLobby(users);
    });
    //

    //Update the available characters when a user selects a character
    clientSocket.on('charactersUpdated', (characters) => {
      setAvailableCharacters(characters);
      console.log(characters)
    });
    //

    //Get the list of available characters from the server
    clientSocket.emit('getCharacters');
    //

    //Check if all players have joined the game --> render the game board when all users have selected ready
    clientSocket.on('allPlayersReady', (ready) => {
      setPlayersReady(ready);
    });
    //

    return () => clientSocket.disconnect();
  }, []);
  

  const handleJoinLobby = (user_data) => {
    setUser(user_data.name); //set the current user's name
    if (socket) {
      //Update server with new user data
      socket.emit('joinLobby', user_data);
      socket.emit('characterSelected', user_data.character);
    }
  };

  //Update the server with the current user's ready status
  const handleUserReady = () => {
    if (socket) {
      socket.emit('userReady', user);
    }
  };
  //

  //Update the player turn state --> this is used to display the current player's turn in the header
  const handlePlayerTurn = (res) => {
    setPlayerTurn(res);
  };
  //

  //This needs work
  const handlePlayAgain = () => {
    socket.emit('resetGame');
  };

  return (
    <div>
      {
        playersReady ? (
          <Grid container style={{height: '100vh', width: '100vw', margin: '0px', padding: '0px'}}> 
            <GameHeader users={usersInLobby} user={user} notification={playerTurn}/>
            <Game hasGameStarted={playersReady} socket={socket} localPlayerName={user} playerTurn={(res) => handlePlayerTurn(res)} playAgain={handlePlayAgain}/>
          </Grid>
        ) : 
        !user ? (
          <UserForm onJoinLobby={handleJoinLobby} availableCharacters={availableCharacters} socket={socket}/>
        ) : (
          <Lobby users={usersInLobby} onUserStartGame={handleUserReady}/>
        )
      }
    </div>
  );

}

export default App;

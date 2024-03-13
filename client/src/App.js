import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
// import UserForm from './components/UserForm';
// import Lobby from './components/Lobby';
// import Game from './components/Game';
const ENDPOINT = "http://127.0.0.1:5000";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [characters, setCharacters] = useState({});
  const [usersReady, setUsersReady] = useState([]);
  const [playerMoveLog, setPlayerMoveLog] = useState([]);
  const [playerCompleteTurnLog, setPlayerCompleteTurnLog] = useState([]);
  const [playerSuggestionLong, setPlayerSuggestionLog] = useState([]);
  const [playershowCardLog, setPlayerShowCardLog] = useState([]);
  const [playerNoCardLog, setPlayerNoCardLog] = useState([]);
  const [playerAccusationLog, setPlayerAccusationLog] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {

    //Create new client socket & update state
    const clientSocket = socketIOClient(ENDPOINT);
    setSocket(clientSocket);
    //

    //clientSocket.emit('requestInitialState');

    //Get the list of characters from the server
    clientSocket.emit('getCharacters');
    clientSocket.on('getCharacters', (characters) => {
      setCharacters(characters);
    });

    //Join the lobby when the user enters their name
    clientSocket.emit('joinLobby');
    clientSocket.on('joinLobby', (user) => {
      setUsersInLobby([...usersInLobby, user]);
    });

    //Update the users in the lobby when the server emits an updated list
    clientSocket.on('updateLobby', (users) => {
      setUsersInLobby(users);
    });
    //

    clientSocket.on('updateReady', (ready) => {
      setUsersReady(ready);
    });

    clientSocket.on('updatePlayerPosition', (log) => {
      setPlayerMoveLog(log);
    });

    clientSocket.on('completeTurn', (log) => {
      setPlayerCompleteTurnLog(log);
    });

    clientSocket.on('makeSuggestion', (log) => {
      setPlayerSuggestionLog(log);
    });

    clientSocket.on('showCard', (log) => {
      setPlayerShowCardLog(log);
    });

    clientSocket.on('noCard', (log) => {
      setPlayerNoCardLog(log);
    });

    clientSocket.on('makeAccusation', (log) => {
      setPlayerAccusationLog(log);
    });

    clientSocket.on('whoWon', (winner) => {
      setWinner(winner);
    });

    clientSocket.on('resetGame', () => {
      setUsersReady([]);
      setPlayerMoveLog([]);
      setPlayerCompleteTurnLog([]);
      setPlayerSuggestionLog([]);
      setPlayerShowCardLog([]);
      setPlayerNoCardLog([]);
      setPlayerAccusationLog([]);
      setWinner(null);
    })


    //Check if all players have joined the game --> render the game board when all users have selected ready
    // clientSocket.on('allPlayersReady', (ready) => {
    //   setPlayersReady(ready);
    // });
    //

    return () => {
      clientSocket.disconnect()
    };
  }, []);
  

  const handleReadyPress = () => {
    socket.emit('userReady', socket.id);
  }

  const handleMovePress = () => {
    socket.emit('updatePlayerPosition', socket.id);
  }

  const handleEndTurnPress = () => {
    socket.emit('completeTurn', socket.id);
  };

  const handleMakeSuggestionPress = () => {
    socket.emit('makeSuggestion', socket.id);
  };

  const handleShowCardPress = () => {
    socket.emit('showCard', socket.id);
  };

  const handleShowNoCardPress = () => {
    socket.emit('noCard', socket.id);
  };

  const handleMakeAccusationPress = () => {
    socket.emit('makeAccusation', socket.id);
  };

  const handleWhoWonPress = () => {
    socket.emit('whoWon');
  };

  const handleResetGamePress = () => {
    socket.emit('resetGame');
  };

  return (
    <div>
      <button onClick={() => handleReadyPress()} disabled={winner != null}>Ready</button>
      <button onClick={() => handleMovePress()} disabled={winner != null}>Move Me</button>
      <button onClick={() => handleEndTurnPress()} disabled={winner != null}>Complete Turn</button>
      <button onClick={() => handleMakeSuggestionPress()} disabled={winner != null}>Make Suggestion</button>
      <button onClick={() => handleShowCardPress()} disabled={winner != null}>Show Card</button>
      <button onClick={() => handleShowNoCardPress()} disabled={winner != null}>No Card to Show</button>
      <button onClick={() => handleMakeAccusationPress()} disabled={winner != null}>Make Accusation</button>
      <button onClick={() => handleWhoWonPress()} disabled={winner != null}>Who won?</button>
      <button onClick={() => handleResetGamePress()}>Reset Game</button>
      
      {
        Object.keys(characters).length > 0 &&
        (
          <>
            <h2>Characters:</h2>
            <ul>
              {characters.map((character, index) => (
                <li key={index}>{character.name}</li>
              ))}
            </ul>
          </>
        )
      }
      {
        usersInLobby.length > 0 &&
        (
          <>
            <h2>Lobby:</h2>
            <ul>
              {usersInLobby.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </>
        )
      }
      {/* {
        usersReady.length > 0 &&
        (
          <> */}
            <h2>Ready:</h2>
            <ul>
              {usersReady.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          {/* </>
        )
      } */}
      {/* {
        playerMoveLog.length > 0 &&
        (
          <> */}
            <h2>Player Move Log:</h2>
            <ul>
              {playerMoveLog.map((user, index) => (
                <li key={index}>{user} requested to move</li>
              ))}
            </ul>
          {/* </>
        )
      } */}
      {/* {
        playerCompleteTurnLog.length > 0 && (
         <> */}
            <h2>Player Complete Turn Log:</h2>
            <ul>
              {playerCompleteTurnLog.map((user, index) => (
                <li key={index}>{user} completed their turn</li>
              ))}
            </ul>
         {/* </> 
        )
      } */}
      {/* {
        playerSuggestionLong.length > 0 && (
          <> */}
            <h2>Player Suggestion Log:</h2>
            <ul>
              {playerSuggestionLong.map((user, index) => (
                <li key={index}>{user} made a suggestion</li>
              ))}
            </ul>
          {/* </>
        )
      } */}
      {/* {
        playershowCardLog.length > 0 && (
          <> */}
            <h2>Player Show Card Log:</h2>
            <ul>
              {playershowCardLog.map((user, index) => (
                <li key={index}>{user} showed a card</li>
              ))}
            </ul>
          {/* </>
        )
      } */}
      {/* {
        playerNoCardLog.length > 0 && (
          <> */}
            <h2>Player No Card Log:</h2>
            <ul>
              {playerNoCardLog.map((user, index) => (
                <li key={index}>{user} had no card to show</li>
              ))}
            </ul>
          {/* </>
        )
      } */}
      {/* {
        playerAccusationLog.length > 0 && (
          <> */}
            <h2>Player Accusation Log:</h2>
            <ul>
              {playerAccusationLog.map((user, index) => (
                <li key={index}>{user} made an accusation</li>
              ))}
            </ul>
          {/* </>
        )
      } */}
      {
        winner != null && (
          <h2>{winner} has won the game!</h2>
        )
      }
    </div>
  );

}

export default App;

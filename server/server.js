const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

//Store the joined users on the server side --> array of objects {name, character, ready}
let users = [];
let currentTurn = 0;

io.on('connection', (socket) => {
    console.log('New client connected');

    //Actions when the user submits the form
    socket.on('joinLobby', (data) => {
        if(users.length < 6){
            socket.name = data.name; //store socket name to identify the user
            users.push(data);
            io.emit('updateLobby', users);  
        } else {
            console.log('lobby is full');
        }
    });
    //

    //Update the lobby with the ready status and update the game if all users are ready to start
    socket.on('userReady', (userName) => {
        users.forEach(user => {
            if (user.name === userName) {
                user.ready = true;
            }
        })
        io.emit('updateLobby', users);

        const allReady = users.every(u => u.ready === true)
        if(allReady && users.length > 1) {
            addPlayerStartingPostions();
            io.emit('updateLobby', users);
            io.emit('allPlayersReady', true);
        }
    });
    //

    //Set the players state to the list of players in the lobby
    socket.on('setup', (playerName) => {
        io.emit('firstRender', users);
        io.emit('playerTurn', users[currentTurn]);
    });

    //Update the current player
    socket.on('completeTurn', () => {
        currentTurn = (currentTurn + 1) % users.length;
        io.emit('playerTurn', users[currentTurn]);
    });
    //

    //Update the position when a player has moved
    socket.on('updatePlayerPosition', (player, newPosition) => {
        users.forEach((user, index) => {
            if (user.name === player.name) {
                users[index].position = newPosition;
            }
        });
        io.emit('playersUpdated', users);
        console.log(users);
    });
    //
    
    //Remove user from list if they have disconnected
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        users = users.filter(u => u.name !== socket.name)
        io.emit('updateLobby', users);
    });
    //

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Add starting positions to the users array based on their character
const addPlayerStartingPostions = () => {
    const startingPositions = [
        { name: 'Miss Scarlet', color: 'red', position: 'hallway-hall-lounge' },
        { name: 'Col. Mustard', color: 'yellow', position: 'hallway-lounge-dining' },
        { name: 'Mrs. White', color: 'white', position: 'hallway-ballroom-kitchen' },
        { name: 'Mr. Green', color: 'green', position: 'hallway-conservatory-ballroom' },
        { name: 'Mrs. Peacock', color:'blue', position: 'hallway-library-conservatory' },
        { name: 'Prof. Plum', color: 'purple', position: 'hallway-study-library' },        
    ]

    users.map(user => {
        startingPositions.map(startingPosition => {
            if (user.character === startingPosition.name) {
                user.position = startingPosition.position;
                user.color = startingPosition.color;
            }
        });
    });
};
//

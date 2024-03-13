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
let readyStatus = [];
let playerMoveRequest = [];
let playerCompleteRequest = [];
let suggestionRequest = [];
let showCardRequest = [];
let noCardRequest = [];
let accusationRequest = [];
let whoWonRequest = false;
let resetGameRequest = false;
let userWinner = null;

io.on('connection', (socket) => {

    //1. Show that a client connected to the server when the React app spins up
    console.log(`Client connected to server with id: ${socket.id}`);

    //2. Show that the client requested the characters list
    socket.on('getCharacters', () => {
        const characters = [
            { name: 'Miss Scarlet', color: 'red' },
            { name: 'Col. Mustard', color: 'yellow' },
            { name: 'Mrs. White', color: 'white' },
            { name: 'Mr. Green', color: 'green' },
            { name: 'Mrs. Peacock', color: 'blue' },
            { name: 'Prof. Plum', color: 'purple' },
        ]

        console.log('broadcasting characters to clients');
        io.emit('getCharacters', characters);
    });

    //3. Show that the client requested to join the lobby
    socket.on('joinLobby', () => {
            io.emit('joinLobby', socket.id);
            users.push(socket.id);
            console.log('broadcasting clients in lobby');
            io.emit('updateLobby', users);  
    });
    

    //4. Update the lobby with the ready status and update the game if all users are ready to start
    socket.on('userReady', (user) => {
        if(!readyStatus.includes(user)){
            readyStatus.push(user);
            console.log('broadcasting ready statuses to all clients');
            io.emit('updateReady', readyStatus);    
        }
    });
    //

    //5. Update the position when a player has moved 
    socket.on('updatePlayerPosition', (user) => {
        playerMoveRequest.push(user);
        console.log('broadcasting movement requests to all clients');
        io.emit('updatePlayerPosition', playerMoveRequest);
    })


    //6. Update the position when a player has completed their turn
    socket.on('completeTurn', (user) => {
        playerCompleteRequest.push(user);
        console.log('broadcasting turn completion requests to all clients');
        io.emit('completeTurn', playerCompleteRequest);
    });


    socket.on('makeSuggestion', (user) => {
        suggestionRequest.push(user);
        console.log('broadcasting suggestion requests to all clients');
        io.emit('makeSuggestion', suggestionRequest);
    });

    socket.on('showCard', (user) => {
        showCardRequest.push(user);
        console.log('broadcasting show card requests to all clients');
        io.emit('showCard', showCardRequest);
    });

    socket.on('noCard', (user) => {
        noCardRequest.push(user);
        console.log('broadcasting no card requests to all clients');
        io.emit('noCard', noCardRequest);
    });

    socket.on('makeAccusation', (user) => {
        accusationRequest.push(user);
        console.log('broadcasting accusation requests to all clients');
        io.emit('makeAccusation', accusationRequest);
    });

    socket.on('whoWon', () => {
        whoWonRequest = true;
        userWinner = users[Math.floor(Math.random() * (users.length))];
        console.log('broadcasting who won to all clients');
        io.emit('whoWon', users[Math.floor(Math.random() * (users.length))]);
    });
    
    socket.on('resetGame', () => {
        resetGameRequest = true;
        console.log('broadcasting reset game to all clients');
        io.emit('resetGame', resetGameRequest);
    });


    //Remove user from list if they have disconnected
    socket.on('disconnect', () => {
        console.log(`Client disconnected with id: ${socket.id}`);
        users = users.filter(u => u !== socket.id);
        readyStatus = readyStatus.filter(u => u !== socket.id);
        io.emit('updateLobby', users);
    });
    //

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

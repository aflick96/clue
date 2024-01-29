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

//Store the joined users on the server side --> array of objects {name, character, ready, character color, position}
let users = [];
let currentTurn = 0; let previousTurn = 0;
let availableCharacters = ["Miss Scarlet", "Prof. Plum", "Col. Mustard", "Mrs. Peacock", "Mr. Green", "Mrs. White"];
let playerActions = [];

const caseFile = {
    'suspect': 'Mr. Green',
    'weapon': 'Rope',
    'room': 'Conservatory'
};


//List of all game items -> use this to randomly assign each player three items.
const gameItems = 
    ["Miss Scarlet", "Prof. Plum", "Col. Mustard", "Mrs. Peacock", "Mr. Green", "Mrs. White",
    "Candlestick", "Dagger", "Lead Pipe", "Revolver", "Rope", "Wrench",
    "Ballroom", "Billiard Room", "Conservatory", "Dining Room", "Hall", "Kitchen", "Library", "Lounge", "Study"
    ]
//

io.on('connection', (socket) => {
    console.log('New client connected');

    //send the list of characters available to the client when they join the connection (localhost:3000)
    socket.on('getCharacters', () => {
        socket.emit('charactersUpdated', availableCharacters);
    });
    //

    //Actions when the user submits the form
    socket.on('joinLobby', (data) => {
        if(users.length < 6){
            socket.name = data.name; //store socket name to identify the user
            socket.character = data.character; //store socket character to identify the user
            users.push(data);
            io.emit('updateLobby', users); 
        } else {
            console.log('lobby is full');
        }
    });
    //

    //Update the available characters when a user selects a character
    socket.on('characterSelected', (character) => {
        availableCharacters = availableCharacters.filter(c => c !== character);
        io.emit('charactersUpdated', availableCharacters);
    });
    //

    //Update the lobby with the ready status and update the game if all users are ready to start
    socket.on('userReady', (userName) => {
        users.forEach(user => {
            if (user.name === userName) {
                user.ready = true;
                let userItems = [];
                for (let i = 0; i < 3; i++) {
                    const item = gameItems[Math.floor(Math.random() * gameItems.length)];
                    userItems.push(item);
                    gameItems.splice(gameItems.indexOf(item), 1);
                }
                user.items = userItems;
                console.log(user)
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
        
        let pos;
        
        users.forEach((user, index) => {
            if (user.name === player.name) {
                pos = users[index].position; 
                users[index].position = newPosition;
            }
        });

        console.log(users);

        //Update the game log with the player's move
        playerActions.push(
            {
                message: player.character + '(' + player.name + ')' + ' moved from ' + pos + ' to ' + newPosition, 
                timestamp: new Date().toLocaleTimeString()
            }
        );
        //
        
        io.emit('playersUpdated', users);
        io.emit('updateGameLog', playerActions);
    });
    //

    socket.on('makeSuggestion', (suggestion) => {
        
        //update the game log with the player's suggestion
        playerActions.push(
            {
                message: suggestion.name + ' (' + suggestion.player_character + ') suggested that ' + suggestion.character + ' did it with the ' + suggestion.weapon + ' in the ' + suggestion.room, 
                timestamp: new Date().toLocaleTimeString()
            }
        );
        //

        io.emit('updateGameLog', playerActions);
    });

    
    //Remove user from list if they have disconnected
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        users = users.filter(u => u.name !== socket.name) //remove user from users array if they disconnect
        if(socket.character !== null || socket.character !== undefined || socket.character !== '') {
            availableCharacters.push(socket.character); //add the user's character back to the available characters
        }
        io.emit('updateLobby', users); //update the lobby with the new list of users
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

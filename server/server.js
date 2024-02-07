const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" || "https://YOURAPPNAME.adaptable.app",
    methods: ["GET", "POST"]
  }
});

console.log(path.join(__dirname, '..', 'client', 'build'));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use(cors());

//Store the joined users on the server side --> array of objects {name, character, ready, character color, position}
let users = [];
let currentTurn = 0;
let availableCharacters = ["Miss Scarlet", "Prof. Plum", "Col. Mustard", "Mrs. Peacock", "Mr. Green", "Mrs. White"];
let playerActions = [];
let currentSuggestion = {};
let noCardCount = 1;

const caseFile = {
    'suspect': '',
    'weapon': '',
    'room': ''
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

    //send the list of users to the client when they join the connection (localhost:3000)
    socket.on('getUsers', (callback) => {
        callback(users);
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
                
        const user = users.find((u) => u.name === userName);
        if (user) { user.ready = true}; 

        io.emit('updateLobby', users);

        const allReady = users.every(u => u.ready === true)
        if(allReady && users.length > 2) {
            addPlayerStartingPostions();
            assignCardsToPlayers();
            io.emit('updateLobby', users);
            io.emit('allPlayersReady', true);
        }
    });
    //

    //Set the players state to the list of players in the lobby
    socket.on('setup', () => {
        io.emit('firstRender', users);
        io.emit('playerTurn', users[currentTurn]);
    });

    //Update the current player
    socket.on('completeTurn', () => {
        currentTurn = (currentTurn + 1) % users.length;
        noCardCount = 1;
        currentSuggestion = {};
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

        //update the game log with the player's move
        let newMoveLogMessage = {
            message: player.character + '(' + player.name + ')' + ' moved from ' + pos + ' to ' + newPosition, 
            timestamp: new Date().toLocaleTimeString()
        };

        let exists = playerActions.some(action => action.message === newMoveLogMessage.message && action.timestamp === newMoveLogMessage.timestamp);

        if (!exists) { 
            playerActions.unshift(newMoveLogMessage);
        }
        //
        
        io.emit('playersUpdated', users);
        io.emit('updateGameLog', playerActions);
    });
    //

    socket.on('makeSuggestion', (suggestion) => {
    
        //update the game log with the player's suggestion
        let newSuggestionLogMessage = {
            message: suggestion.name + ' (' + suggestion.player_character + ') suggested that ' + suggestion.character + ' did it with the ' + suggestion.weapon + ' in the ' + suggestion.room, 
            timestamp: new Date().toLocaleTimeString()
        };

        let exists = playerActions.some(action => action.message === newSuggestionLogMessage.message && action.timestamp === newSuggestionLogMessage.timestamp);

        if (!exists) {
            playerActions.unshift(newSuggestionLogMessage);
        };
        //

        io.emit('updateGameLog', playerActions);

        //update the current suggestion & emit the next player's turn to show the suggestion overlay
        currentSuggestion = suggestion;
        io.emit('playerShowSelect', users[(currentTurn)], users[(currentTurn + 1) % users.length], suggestion);
        //

    });
    
    //Show the card that the current player has that matches the current suggestion
    socket.on('showUserCard', (suggestor, card) => {
        io.emit('updateSuggestionLogWithShownCard', suggestor, card);
    });
    //

    //Move to the next player if the current player does not have a card that matches the current suggestion
    socket.on('noCard', () => {

        noCardCount = (noCardCount + 1) % users.length;

        if(noCardCount === currentTurn){
            console.log('reached user');
        } else {
            io.emit('playerShowSelect', users[(currentTurn)], users[noCardCount], currentSuggestion);
        }
    });
    //

    //Remove user from list if they have disconnected
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        let userName = socket.name;

        users.forEach(user => {
            if (user.name === userName) {
                availableCharacters.push(user.character);
                if(user.items.length > 0) { gameItems.push(...user.items); }
                user.character = null;
                user.color = null;
                user.position = null;
                user.ready = false;
                user.items = [];
            }
        }); 

        users = users.filter(u => u.name !== userName);

        io.emit('charactersUpdated', availableCharacters);
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

//Assigns all cards to the players (except the case file cards) when game starts
const assignCardsToPlayers = () => {    
    let leftOverCards = 18 % users.length;
    let cardsPerUser = Math.floor(18/users.length);


    users.forEach(user => {
        
        let userItems = [];    
        
        if (leftOverCards === 0){
            for (let i = 0; i < cardsPerUser; i++) {
                const item = gameItems[Math.floor(Math.random() * gameItems.length)];
                userItems.push(item);
                gameItems.splice(gameItems.indexOf(item), 1);
            }    
        } else {
            for (let i = 0; i < cardsPerUser + 1; i++) {
                const item = gameItems[Math.floor(Math.random() * gameItems.length)];
                userItems.push(item);
                gameItems.splice(gameItems.indexOf(item), 1);
            }
            leftOverCards -= 1;                
        }
        user.items = userItems;
    })
};
//

//Build the case file with a random suspect, weapon, and room when the server starts
const buildCaseFile = () => {
    const suspect = gameItems[Math.floor(Math.random() * 6)];
    const weapon = gameItems[Math.floor(Math.random() * 6) + 6];
    const room = gameItems[Math.floor(Math.random() * 9) + 12];
    caseFile.suspect = suspect;
    caseFile.weapon = weapon;
    caseFile.room = room;
    
    gameItems.splice(gameItems.indexOf(suspect), 1);
    gameItems.splice(gameItems.indexOf(weapon), 1);
    gameItems.splice(gameItems.indexOf(room), 1);
    
    console.log(caseFile);
};

buildCaseFile();
//

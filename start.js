const mysql = require('mysql');
const express = require('express').Router();
const app = express();
const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database')
});

function getCharacterData(characterId, callback){
    const query = `SELECT * FROM charData WHERE id = ${user_id} `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving character data: ' + err.stack);
            callback(err, null);
        } else {
            callback(null, results[0]);
        }
    })
}
// process the user input and execute commands
function processCommand(command){

}
// allows user to choose a direction
function goCommand(direction){

}
// allows user to take an item
function  takecommand(item){


}
// if the user is stuck
function showHelp(){

}
// shows items and clothes and anything in inventory
function showInventory(){

}
// replaces items in the database
// function updateStats() {



// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });



  
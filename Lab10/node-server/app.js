const express = require('express');
var fs = require("fs");
const app = express();
var cors = require('cors');
app.use(cors());

var notes = [];
var users = ['user1', 'user2', 'user3', 'user4'];
var loggedUser = '';

class Note {
    constructor(content, date) {
        this.content = content;
        this.date = date;
    }
}



function ReadFile() {
    notes = JSON.parse(fs.readFileSync(loggedUser + '.json')).notes;
}

function writeFile() {
    fs.writeFileSync(loggedUser + '.json', JSON.stringify({ notes: notes }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/add', (request, response) => {
    console.log(loggedUser);
    console.log(notes);
    if (request.body.content) {
        notes.push(new Note(request.body.content,new Date().toJSON().slice(0,10)));
        console.log(notes);
        writeFile();
        response.send({'content': notes});
    }
    else
        response.send({ 'success': false });
});


app.get('/login/:id', (request, response) => {
    if (request.params.id && users.filter(login => login == request.params.id).length > 0) {
        loggedUser = request.params.id;
        ReadFile();
        response.send({ 'success': true, 'notes': notes });
    }
    else
        response.send({ 'success': false });
});


app.get('/logout', (request, response) => {
    loggedUser = '';
    writeFile();
    response.send({'logged':false});
})

app.listen(8000, () => {
    console.log('Server running at http://localhost:8000/');
});
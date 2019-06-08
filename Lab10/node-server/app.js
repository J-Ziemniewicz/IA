const express = require('express');
var fs = require("fs");
const app = express();

function simpleReadFileSync(filePath)
{
    var options = {encoding:'utf-8', flag:'r'};

    var buffer = fs.readFileSync(filePath, options);

    console.log("File content : " + buffer);
    return buffer
}

function writeFileStream(filePath, data) {

    var writeStream = fs.createWriteStream(filePath, {encoding:'utf-8', flag:'w'})
    
    writeStream.write(data);
    
    writeStream.on('close', function () {
        console.log('Write stream is closed. ');
    })
}


app.get('/login/add/:id', (request, response) => {
 response.send(`Sending notes with id ${request.params.id}`)
});

app.get('/login/:id', (request, response) => {

    response.send(simpleReadFileSync(`${request.params.id}.txt`))
   });


app.listen(8000, () => {
 console.log('Server running at http://localhost:8000/');
});
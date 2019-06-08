const express = require('express');
const app = express();
app.get('/login/:id', (request, response) => {
 response.send(`Sending notes with id ${request.params.id}`)
});
app.listen(8000, () => {
 console.log('Server running at http://localhost:8000/');
});
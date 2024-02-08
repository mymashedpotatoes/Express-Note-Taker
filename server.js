//Dependencies
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

app.use(express.static('public'));
app.use(express.json());
app.use('/api', api);


//HTML Routes
//Index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//Wildcard
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
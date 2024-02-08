//Dependencies
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route
notes.post('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in adding note');
    }
  });

//DELETE Route
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received for notes`);
  let id = req.params.id;
  let parsedData;
  readFromFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      parsedData = JSON.parse(data);
      const filterData = parsedData.filter((note) => note.id !== id);
      writeToFile("./db/db.json", filterData);
    }
  });
  res.send(`Deleted note with ${req.params.id}`);
});

module.exports = notes;
const express = require('express');
const fs = require("fs")
const path = require('path');
const app = express();

// Require the JSON file and assign it to a variable called `termData`
const db = require('./db/db.json')

const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  res.json(db)
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
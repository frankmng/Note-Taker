const express = require('express');
const fs = require("fs")
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// Require the JSON file and assign it to a variable called `termData`
const db = require('./db/db.json')

const PORT = 3001;

app.use(express.static('public'));
// Middleware to parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// GET request to retrieve notes
app.get('/api/notes', (req, res) => {
  res.status(200).json(db)
});

// POST request to add a note
app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

  if (title && text){
      const newNote =  {
        title,
        text,
      };

      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);

          parsedNotes.push(newNote);
          fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
          );
        }
      })
      const response = {
        status: 'success',
        body: newNote,
      }
      res.status(201).json(response);
      } else {
        res.status(500).json('Error in adding note')
      }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
});
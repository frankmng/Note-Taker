const express = require('express');
const path = require('path');
const api = require('./routes/index.js')
var bodyParser = require('body-parser');
const { clog } = require('./middleware/clog');
const app = express();


const PORT = Process.env.PORT || 3000;
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json())

app.use('/api', api);

app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// Wildcard route to direct users to a index page
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
});

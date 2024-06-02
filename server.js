const express = require('express'); // Import Express.js
const path = require('path'); // Import built-in Node.js package 'path' to resolve path of files that are located on server
const fs = require('fs');
const app = express(); // Initialize instance of Express.js
const PORT = process.env.PORT || 5001; // Specifies on which port Express.js server will run

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// Static middleware pointing to the public folder 
app.use(express.static('public')); 

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public.index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './publc/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// POST route for a new note
app.post('/notes', function (req, res) {
//   const note = 
  db.push(req.body);
  db.forEach((obj, i) => {
    obj.id = i + 1;
  });
  fs.writeFile('./db/db.json', JSON.stringify(db), function() {
    res.json(db);
    // console.info('Successfully updated your notes!')
  });
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
); 


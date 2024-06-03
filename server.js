const express = require('express'); // Import Express.js
const path = require('path'); // Import built-in Node.js package 'path' to resolve path of files that are located on server
const fs = require('fs');
const uuid = require('./uuid/uuid'); // Creates uniques ids
const app = express(); // Initialize instance of Express.js
const PORT = process.env.PORT || 5001; // Specifies on which port Express.js server will run

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // app.use('/api', api);
// Static middleware pointing to the public folder 
app.use(express.static('public')); 

// // GET route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public.index.html'))
// );

// GET route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// This wild card was causing the error in the browser and when moved to lines 62 to 64 the application then worked!!! It took over the index.html and was trying to read as JSON.
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// );

// GET route to return all saved notes 
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// POST route to display new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} Request received to add a note`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        let addNote = req.body;
        addNote.id = uuid();
        notes.push(addNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            res.json(notes);
            console.info('Sucessfully updated notes!')
        });
    });
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
  );

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
); 




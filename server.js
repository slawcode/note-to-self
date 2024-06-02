const express = require('express'); // Import Express.js
const path = require('path'); // Import built-in Node.js package 'path' to resolve path of files that are located on server
const fs = require('fs');

const uuid = require('./uuid/uuid');
const app = express(); // Initialize instance of Express.js
const PORT = process.env.PORT || 5001; // Specifies on which port Express.js server will run

// // const { v4: uuidv4 } = require('uuid');
// // const notes = [];
// // app.use(bodyParser.json()); // Middleware to parse JSON bodies

// // Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // app.use('/api', api);

// // Static middleware pointing to the public folder 
app.use(express.static('public')); 

// // GET route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public.index.html'))
// );

// GET route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/publc/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// POST route for a new note
// app.post('/notes', function (req, res) {
// //   const note = 
//   db.push(req.body);
//   db.forEach((obj, i) => {
//     obj.id = i + 1;
//   });
//   fs.writeFile('./db/db.json', JSON.stringify(db), function() {
//     res.json(db);
//     // console.info('Successfully updated your notes!')
//   });
// });

// Create a new note
// app.post('/notes', (req, res) => {
//     const note ={ id: uuidv4(), title:  req.body.title, content:
//         req.body.content };
//         note.push(note);
//         res.status(201).json(note);
// });

// app.post('/api/notes', (req, res) => {
//     res.json(`${req.method} request received`);
//     console.info(req.rawHeaders);
//     console.info(`${req.method} request received`);
// });

// GET and return all notes 
app.get('/api/notes', (req, res) => {
    fs.readFile('.//db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
); 

// Update a note
// app.put('/notes/:id', (req, res) => {
//     const index = notes.findIndex(n => n.id === req.params.id);
//     if (index !== -1) {
//         notes[index] = { id: req.paramsms.id, title: req.body.title, content:
//             req.body.content };
//             res.json(notes[index]);
//         } else {
//             res.status(404).send('Note not found');
//         }
//     });


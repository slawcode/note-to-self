const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
); 
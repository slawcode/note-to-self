const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Directs users to 
app.get('*', (req, res) =>
res.sendFile9path.join(__dirname, 'public/index.html'))

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
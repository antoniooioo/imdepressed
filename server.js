const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.static('public'));

// Connect to the SQLite database
const db = new sqlite3.Database('quotes.db');

// Define a route to fetch a random quote
app.get('/getRandomQuote', (req, res) => {
    db.all('SELECT text FROM quotes ORDER BY RANDOM() LIMIT 1', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching quote' });
        } else {
            if (rows && rows.length > 0) {
                res.json({ quote: rows[0].text });
            } else {
                res.status(404).json({ error: 'No quotes found' });
            }
        }
    });
});

app.post('/addQuote', (req, res) => {
    db.run('INSERT INTO quotes(text) VALUES(?)', [req.query.quote], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error adding quote' });
        } else {
            res.json({ success: true });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
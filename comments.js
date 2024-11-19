// create web server
const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;

// get comments
app.get('/comments', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'John Doe',
            comment: 'This is a comment'
        },
        {
            id: 2,
            name: 'Jane Doe',
            comment: 'This is another comment'
        }
    ]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
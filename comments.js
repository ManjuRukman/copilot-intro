// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// Middleware
app.use(bodyParser.json());

// Read comments from file
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      console.log('Error reading comments file:', err);
      res.status(500).send('Error reading comments file');
      return;
    }
    res.send(data.toString());
  });
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      console.log('Error reading comments file:', err);
      res.status(500).send('Error reading comments file');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(comment);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.log('Error writing comments file:', err);
        res.status(500).send('Error writing comments file');
        return;
      }
      res.send('Comment added');
    });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
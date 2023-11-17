// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Use body parser to parse JSON
app.use(bodyParser.json());

// Use CORS
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', (req, res) => {
  // Generate a random id for the comment
  const commentId = randomBytes(4).toString('hex');

  // Get the comment content from the request body
  const { content } = req.body;

  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];

  // Add the comment to the comments array
  comments.push({ id: commentId, content });

  // Add the comments to the comments object
  commentsByPostId[req.params.id] = comments;

  // Send back the comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001');
});
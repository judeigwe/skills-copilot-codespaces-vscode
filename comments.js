// Create web server application with Node.js and Express.js
// and connect to MongoDB database

// Import Node.js modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Import Mongoose Schema
const Comment = require('./models/comment');

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
router.use(bodyParser.json());

// Get all comments
router.get('/', (req, res) => {
	Comment.find({}, function(err, comments) {
		if (err) {
			res.send('Error getting comments');
		}
		res.json(comments);
	});
});

// Get a comment by id
router.get('/:id', (req, res) => {
	Comment.findById(req.params.id, function(err, comment) {
		if (err) {
			res.send('Error getting comment');
		}
		res.json(comment);
	});
});

// Add a new comment
router.post('/', (req, res) => {
	const comment = new Comment({ 

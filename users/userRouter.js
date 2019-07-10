const express = require('express');
const router = express.Router();
const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, async (req, res) => {
	try {
		const user = await Users.insert(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while saving the user to the database',
		});
	}
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
	try {
		const post = await Posts.insert(req.body);
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while saving the post to the database',
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const users = await Users.get();
		res.status(200).json(users);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The users information could not be retrieved.' });
	}
});

router.get('/:id', validateUserId, async (req, res) => {
	try {
		const user = await Users.getById(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res
				.status(404)
				.json({ message: 'The user with the specified ID does not exist.' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The user information could not be retrieved.' });
	}
});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
	const { id } = req.params;
	const user = await Users.getById(id);
	if (user) {
		req.user = user;
		next();
	} else {
		res.status(400).json({ message: 'invalid user id' });
	}
}

async function validateUser(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		if (req.body.name) {
			next();
		} else {
			res.status(400).json({ message: 'missing required name field' });
		}
	} else {
		res.status(400).json({ message: 'missing user data' });
	}
}

async function validatePost(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		if (req.body.text) {
			next();
		} else {
			res.status(400).json({ message: 'missing required text field' });
		}
	} else {
		res.status(400).json({ message: 'missing post data' });
	}
}

module.exports = router;

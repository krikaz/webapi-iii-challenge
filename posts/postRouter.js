const express = require('express');
const Posts = require('./postDb');
const validatePost = require('../users/userRouter').validatePost;

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const posts = await Posts.get();
		res.status(200).json(posts);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The posts information could not be retrieved.' });
	}
});

router.get('/:id', validatePostId, async (req, res) => {
	try {
		res.status(200).json(req.post);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The post information could not be retrieved.' });
	}
});

router.delete('/:id', validatePostId, async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Posts.remove(id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ error: 'The post could not be deleted.' });
	}
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Posts.update(id, req.body);
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while updating the post to the database',
		});
	}
});

// custom middleware

async function validatePostId(req, res, next) {
	const { id } = req.params;
	const post = await Posts.getById(id);
	if (post) {
		req.post = post;
		next();
	} else {
		res.status(400).json({ message: 'invalid post id' });
	}
}

module.exports = router;

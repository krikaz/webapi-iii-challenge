const express = require('express');
const server = express();
const usersRoutes = require('./users/userRouter');
const postsRoutes = require('./posts/postRouter');

server.use(express.json());
server.use(logger);
server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	const date = new Date();
	console.log(date.toLocaleDateString(), req.method, req.url);
	next();
}

module.exports = server;

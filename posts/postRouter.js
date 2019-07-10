const express = require('express');
const Posts = require('./postDb');

const router = express.Router();

function validateUserId(req, res, next) {
  const { id } = req.params;
  if (Number.isInteger(Number.id)) {
    req.validate = true;
    const post = await Posts.getById(id)
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(404).json({ message: 'that id has gone to Mars!' });
    }
  } else {
    res.set('X-Nasty', 'Nasty ID');
    res.json({ message: "that does not look like an id!!" });
  }
};

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware



module.exports = router;
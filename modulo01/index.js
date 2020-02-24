const express = require('express');

const server = express();

server.use(express.json())

const users = []

server.get('/users', (req, res) => {
  return res.json({users});
})

server.get('/users/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;
  return res.json(users[id]);
})

function checkUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'name key not found on body request' })
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if(!users[req.params.id]) {
    return res.status(404).json({ error: 'User not found' })
  }

  return next();
}

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json({users});
})

server.put('/users/:id', checkUserInArray, checkUserExists, (req, res) => {
  const { id } = req.params;
  users[id] = req.body.name;
  
  return res.json({users});
})

server.delete('/users/:id', checkUserExists, (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);

  return res.send();
})
server.listen(3000);
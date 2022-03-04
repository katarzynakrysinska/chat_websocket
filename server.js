const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

/* can only be called on an instance (const server) of a created server (not on app) */
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client with ID: ', socket.id);

  socket.on('join', (login) => {
    users.push({ name: login, id: socket.id });
    console.log('on join: ', users);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `${login} joined the chat` });
  });

  socket.on('message', (message) => {
    console.log('I\'ve got a message from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  console.log('I\'ve added a listener on message event \n');

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    const user = users.find(person => person.id === socket.id);
    const index = users.indexOf(user);
    users.splice(index, 1);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `${user.name} left the chat` });
    console.log('on leave: ', users);
  });

});
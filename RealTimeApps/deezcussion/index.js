const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

let usernames = {};

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

io.on('connection', (socket) => {
  
  socket.on('message', (message) => {
    io.emit('message', message);
  })

  socket.on('disconnect', () => {
    const username = usernames[socket.id];
    if(!username) {
      return;
    }
    delete usernames[socket.id];
    socket.broadcast.emit('user left', username);
  });

  socket.on('login', (username) => {
    usernames[socket.id] = username;
    socket.emit('user list', Object.values(usernames));
    socket.broadcast.emit('user joined', username);
  });
})

const port = process.env.PORT || 5000;
var listener = server.listen(port, () => {
  console.log('Listening on port: ' + port);
});
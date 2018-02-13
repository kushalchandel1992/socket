const express = require('express');
const app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const router = express.Router();

require('./router')(router);
app.use(bodyParser.json());
app.use('/api/v1', router);


io.on('connection', (socket) => {
  socket.username = "Anonymous"
  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.nickname, event: 'left' });
  });


  socket.on('typing', (data) => {
    io.emit('typing', { username: socket.username })
  })

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', { user: nickname, event: 'joined' });
  });

  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
  });
});






var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});
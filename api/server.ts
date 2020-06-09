import express = require('express');
import http = require('http');
import socketIo = require('socket.io');
import { UserModel, getInitialUserList } from './user_model';

const port = process.env.port || 8080
const app: express.Application = express();
const server = http.createServer(app);
const wsServer = socketIo(server);

const initialUsers = getInitialUserList();

app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>');
});

server.listen(port, function () {
    console.log('App is listening');
});

wsServer.on('connection', () => {
    console.log('new connection!');
});
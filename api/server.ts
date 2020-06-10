import { UserModel, getInitialUserList } from './user_model';
import express = require('express');
import socketIo = require('socket.io');
import http = require('http');
import path = require('path');
import cors = require('cors');
import fs = require('fs');

const port = process.env.PORT || 8080
const app: express.Application = express();
const server = http.createServer(app);
const wsServer = socketIo(server);

const initialUsers: Array<UserModel> = getInitialUserList(port === 8080);
const staticDirectory: string = path.join(__dirname + '/../assets/');
const clientBuildDirectory: string = path.join(__dirname + '/../client/build/');

app.use(express.static(staticDirectory));
app.use(express.static(clientBuildDirectory));
app.use(cors());

app.get('/api/photo/:name', function (req, res) {
    var userName: string = req.params.name;
    var photos = fs.readdirSync(staticDirectory);
    var didFindPhoto = false;
    photos.forEach((photo) => {
        if (photo.includes(userName)) {
            res.sendFile(path.join(staticDirectory, photo));
            didFindPhoto = true;
            return;
        }
    });
    if (!didFindPhoto) {
        res.statusCode = 400;
        res.send('File not found');
    }
});

app.get('/api/available-users', function (req, res) {
    var availableUsers = initialUsers.filter((user) => user.isLogged === false);

    return res.json(availableUsers);
});

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: clientBuildDirectory });
});

server.listen(port, function () {
    console.log('App is listening');
});

wsServer.on('connection', (socket) => {
    socket.emit('message', `Hello at: ${new Date().toString()}`);
});
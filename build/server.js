"use strict";
exports.__esModule = true;
var user_model_1 = require("./user_model");
var express = require("express");
var socketIo = require("socket.io");
var http = require("http");
var path = require("path");
var fs = require("fs");
var port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var wsServer = socketIo(server);
var initialUsers = user_model_1.getInitialUserList();
var staticDirectory = path.join(__dirname + '/../assets/');
var clientBuildDirectory = path.join(__dirname + '/../client/dist/quizz-app');
app.use(express.static(staticDirectory));
app.use(express.static(clientBuildDirectory));
app.get('/api/photo/:name', function (req, res) {
    var userName = req.params.name;
    var photos = fs.readdirSync(staticDirectory);
    var didFindPhoto = false;
    photos.forEach(function (photo) {
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
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: clientBuildDirectory });
});
server.listen(port, function () {
    console.log('App is listening');
});
wsServer.on('connection', function () {
    console.log('new connection!');
});

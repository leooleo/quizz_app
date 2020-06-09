"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var user_model_1 = require("./user_model");
var port = process.env.port || 8080;
var app = express();
var server = http.createServer(app);
var wsServer = socketIo(server);
var initialUsers = user_model_1.getInitialUserList();
app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>');
});
server.listen(port, function () {
    console.log('App is listening');
});
wsServer.on('connection', function () {
    console.log('new connection!');
});

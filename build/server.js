"use strict";
exports.__esModule = true;
var user_model_1 = require("./user_model");
var socketIo = require("socket.io");
var express = require("express");
var http = require("http");
var path = require("path");
var cors = require("cors");
var fs = require("fs");
var port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var wsServer = socketIo(server);
var initialUsers = user_model_1.getInitialUserList(port === 8080);
var staticDirectory = path.join(__dirname + '/../assets/');
var clientBuildDirectory = path.join(__dirname + '/../client/build/');
var usersQuestions = Array();
app.use(express.static(staticDirectory));
app.use(express.static(clientBuildDirectory));
app.use(express.json());
app.use(cors());
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
app.get('/api/questions', function (req, res) {
    return res.json(usersQuestions);
});
app.post('/api/question/:user', function (req, res) {
    try {
        var body = req.body;
        var userName = req.params.user;
        if (body == null || body == undefined)
            throw 'QuestionModel not provided';
        if (body.question == undefined)
            throw 'Question not provided';
        if (body.possibleAnswers == undefined || body.possibleAnswers.length == 0)
            throw 'Poosible Answers not provided';
        var questions = usersQuestions.filter(function (user) { return user.createdByUser == userName; });
        if (questions == undefined || questions == null || questions.length == 0) {
            usersQuestions.push(body);
        }
        else {
            usersQuestions.push(body);
            if (questions.length >= 2) {
                setUserAnswered(userName);
            }
        }
        return res.json({ 'message': 'ok' });
    }
    catch (e) {
        res.statusCode = 400;
        return res.json({ 'message': e });
    }
});
app.get('/api/questions/:user', function (req, res) {
    var user = req.params.user;
    var questions = usersQuestions.filter(function (u) { return u.createdByUser == user; });
    if (questions == undefined || questions == null)
        return res.json([]);
    return res.json(questions);
});
app.get('/api/users', function (req, res) {
    return res.json(initialUsers);
});
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: clientBuildDirectory });
});
server.listen(port, function () {
    console.log('App is listening');
});
wsServer.on('connection', function (socket) {
    socket.emit('message', "Hello at: " + new Date().toString());
});
function setUserAnswered(userName) {
    initialUsers.map(function (u) {
        if (u.name == userName)
            u.hasAnswered = true;
    });
}

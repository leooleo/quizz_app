"use strict";
exports.__esModule = true;
var user_model_1 = require("./user_model");
var question_model_1 = require("./question_model");
var socketIo = require("socket.io");
var express = require("express");
var http = require("http");
var path = require("path");
var cors = require("cors");
var fs = require("fs");
var quizz_question_model_1 = require("./quizz_question_model");
var score_model_1 = require("./score_model");
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
            if (questions.length >= 3) {
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
function finnishCurrentRound() {
    sortUsers();
    decreaseIdleUsers();
    var scoreModel = new score_model_1.ScoreModel(initialUsers, winners, loosers);
    wsServer.sockets.emit('score', scoreModel);
    winners = new Array();
    loosers = new Array();
    setTimeout(function () {
        if (usersQuestions.length != 0) {
            currentQuestion = usersQuestions.pop();
            wsServer.sockets.emit('currentQuestion', currentQuestion);
            calculateElapsedTime(15, 15);
        }
        else {
            //TODO: implement winner logic
            // wsServer.sockets.emit('winner', )
        }
    }, 10000);
}
function calculateElapsedTime(timeLeft, totalTime) {
    if (timeLeft <= 0) {
        wsServer.sockets.emit('timer', 0);
        finnishCurrentRound();
        return;
    }
    ;
    var proportionalTimeLeft = (timeLeft / totalTime) * 100;
    wsServer.sockets.emit('timer', proportionalTimeLeft);
    setTimeout(function () {
        calculateElapsedTime(timeLeft - 1, totalTime);
    }, 1000);
}
function initializeQuizz(socket) {
    quizzIsRunning = true;
    currentQuestion = usersQuestions.pop();
    var quizzQuestion = new quizz_question_model_1.QuizzQuestionModel(currentQuestion);
    if (!notifiedClientsOfQuestion) {
        wsServer.sockets.emit('currentQuestion', quizzQuestion);
        notifiedClientsOfQuestion = true;
        calculateElapsedTime(15, 15);
    }
    else {
        socket.emit('currentQuestion', quizzQuestion);
    }
}
//TODO: mock only!
usersQuestions = question_model_1.getMockQuestions();
var numberOfClients = 0;
var notifiedClientsOfQuestion = false;
var currentQuestion;
var quizzIsRunning = false;
var winners = new Array();
var loosers = new Array();
wsServer.on('connection', function (socket) {
    socket.on('disconnect', function () {
        if (numberOfClients > 0) {
            numberOfClients -= 1;
            console.log("connected " + numberOfClients + " of " + initialUsers.length);
        }
    });
    socket.on('answer', function (answerModel) {
        if (answerModel.answer == currentQuestion.correctAnswer) {
            increaseUserScore(answerModel.userName);
        }
        else {
            decreaseUserScore(answerModel.userName);
        }
    });
    numberOfClients += 1;
    console.log("connected " + numberOfClients + " of " + initialUsers.length);
    if (numberOfClients < initialUsers.length) {
        socket.emit('waiting', "Aguardando " + (initialUsers.length - numberOfClients) + " usu\u00E1rio(s) se conectar(em)");
    }
    else {
        if (!quizzIsRunning)
            initializeQuizz(socket);
        else
            socket.emit('currentQuestion', currentQuestion);
    }
});
function decreaseIdleUsers() {
    var idleUsers = initialUsers.filter(function (user) { return !winners.includes(user.name) && !loosers.includes(user.name); });
    idleUsers.forEach(function (user) { return decreaseUserScore(user.name); });
}
function increaseUserScore(userName) {
    winners.push(userName);
    initialUsers.map(function (u) {
        if (u.name == userName)
            u.score += 1;
    });
}
function decreaseUserScore(userName) {
    loosers.push(userName);
    initialUsers.map(function (u) {
        if (u.name == userName)
            u.score -= 0.5;
    });
}
function setUserAnswered(userName) {
    initialUsers.map(function (u) {
        if (u.name == userName)
            u.hasAnswered = true;
    });
}
function sortUsers() {
    initialUsers.sort(function (a, b) {
        if (a.score < b.score)
            return 1;
        if (a.score > b.score)
            return -1;
        return 0;
    });
}

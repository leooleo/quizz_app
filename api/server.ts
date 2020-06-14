import { UserModel, getInitialUserList } from './user_model';
import { QuestionModel, getMockQuestions } from './question_model';
import socketIo = require('socket.io');
import express = require('express');
import http = require('http');
import path = require('path');
import cors = require('cors');
import fs = require('fs');
import { QuizzQuestionModel } from './quizz_question_model';
import { AnswerModel } from './answer_model';
import { ScoreModel } from './score_model';

const port = process.env.PORT || 8080
const app: express.Application = express();
const server = http.createServer(app);
const wsServer = socketIo(server);

const initialUsers: Array<UserModel> = getInitialUserList(port === 8080);
const staticDirectory: string = path.join(__dirname + '/../assets/');
const clientBuildDirectory: string = path.join(__dirname + '/../client/build/');
var usersQuestions: Array<QuestionModel> = Array<QuestionModel>();

app.use(express.static(staticDirectory));
app.use(express.static(clientBuildDirectory));
app.use(express.json());
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

app.get('/api/questions', function (req, res) {
    return res.json(usersQuestions);
});

app.post('/api/question/:user', function (req, res) {
    try {
        var body: QuestionModel = req.body;
        var userName: string = req.params.user;
        if (body == null || body == undefined)
            throw 'QuestionModel not provided';
        if (body.question == undefined)
            throw 'Question not provided';
        if (body.possibleAnswers == undefined || body.possibleAnswers.length == 0)
            throw 'Poosible Answers not provided';


        var questions: Array<QuestionModel> = usersQuestions.filter((user) => user.createdByUser == userName);
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
    var user: string = req.params.user;
    var questions = usersQuestions.filter((u) => u.createdByUser == user);
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
    var users = initialUsers;
    decreaseIdleUsers();
    var scoreModel = new ScoreModel(users, winners, loosers);
    wsServer.sockets.emit('score', scoreModel);
    winners = new Array<string>();
    loosers = new Array<string>();
    setTimeout(() => {
        currentQuestion = usersQuestions.pop();
        wsServer.sockets.emit('currentQuestion', currentQuestion);
        calculateElapsedTime(15, 15);
    }, 10000);
}

function calculateElapsedTime(timeLeft: number, totalTime: number) {
    if (timeLeft <= 0) {
        wsServer.sockets.emit('timer', 0);
        finnishCurrentRound();
        return;
    };
    var proportionalTimeLeft = (timeLeft / totalTime) * 100;
    wsServer.sockets.emit('timer', proportionalTimeLeft);
    setTimeout(() => {
        calculateElapsedTime(timeLeft - 1, totalTime);
    }, 1000);
}

function initializeQuizz(socket: SocketIO.Socket) {
    quizzIsRunning = true;
    currentQuestion = usersQuestions.pop();
    var quizzQuestion = new QuizzQuestionModel(currentQuestion);
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
usersQuestions = getMockQuestions();
var numberOfClients: number = 0;
var notifiedClientsOfQuestion: boolean = false;
var currentQuestion: QuestionModel;
var quizzIsRunning: boolean = false;
var winners: Array<string> = new Array<string>();
var loosers: Array<string> = new Array<string>();
wsServer.on('connection', (socket) => {
    socket.on('disconnect', () => {
        if (numberOfClients > 0) {
            numberOfClients -= 1;
            console.log(`connected ${numberOfClients} of ${initialUsers.length}`);
        }
    });

    socket.on('answer', (answerModel: AnswerModel) => {
        if (answerModel.answer == currentQuestion.correctAnswer) {
            increaseUserScore(answerModel.userName);
        }
        else {
            decreaseUserScore(answerModel.userName);
        }
    });

    numberOfClients += 1;
    console.log(`connected ${numberOfClients} of ${initialUsers.length}`);
    if (numberOfClients < initialUsers.length) {
        socket.emit('waiting', `Aguardando ${initialUsers.length - numberOfClients} usuário(s) se conectar(em)`);
    }
    else {
        if (!quizzIsRunning)
            initializeQuizz(socket);
        else
            socket.emit('currentQuestion', currentQuestion);
    }
});

function decreaseIdleUsers() {
    var idleUsers = initialUsers.filter((user) => !winners.includes(user.name) && !loosers.includes(user.name));
    console.log(idleUsers);
    idleUsers.forEach((user) => decreaseUserScore(user.name));
}

function increaseUserScore(userName: string) {
    winners.push(userName);
    initialUsers.map((u: UserModel) => {
        if (u.name == userName) u.score += 1;
    });
}

function decreaseUserScore(userName: string) {
    loosers.push(userName);
    initialUsers.map((u: UserModel) => {
        if (u.name == userName) u.score -= 0.5;
    });
}

function setUserAnswered(userName: string) {    
    initialUsers.map((u: UserModel) => {
        if (u.name == userName) u.hasAnswered = true;
    });
}
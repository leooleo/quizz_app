import { UserModel, getInitialUserList } from './user_model';
import { QuestionModel } from './question_model';
import socketIo = require('socket.io');
import express = require('express');
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
const usersQuestions: Map<string, Array<QuestionModel>> = new Map<string, Array<QuestionModel>>();

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
        var user: string = req.params.user;        
        if (body == null || body == undefined) 
            throw 'QuestionModel not provided';        
        if(body.question == undefined) 
            throw 'Question not provided';
        if(body.possibleAnswers == undefined || body.possibleAnswers.length == 0)
            throw 'Poosible Answers not provided';
        

        var questions: Array<QuestionModel> = usersQuestions[user];
        if (questions == undefined || questions == null || questions.length == 0) {
            usersQuestions[user] = [body];
        }
        else {
            questions.push(body);
            usersQuestions[user] = questions;
        }

        return res.send('ok');
    }
    catch (e) {
        res.statusCode = 400;

        return res.send(e);
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
"use strict";
exports.__esModule = true;
exports.getMockQuestions = exports.QuestionModel = void 0;
var QuestionModel = /** @class */ (function () {
    function QuestionModel(question, createdByUser, possibleAnswers, correctAnswer) {
        this.question = question;
        this.createdByUser = createdByUser;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }
    return QuestionModel;
}());
exports.QuestionModel = QuestionModel;
function getMockQuestions() {
    return new Array(new QuestionModel('Qual meu nome inteiro?', 'Léo', ['Léo Moraes da Silva', 'Méo Loraes', 'Xeo Moraes'], '1'), new QuestionModel('Quem sou eu?', 'Léo', ['Léo', 'Léo', 'Léo'], '1'), new QuestionModel('Quem sou eu?', 'Léo', ['Léo', 'Léo', 'Léo'], '1'), new QuestionModel('Qual meu nome?', 'Bonfa', ['Bonfim', 'errado 1', 'errado 2'], '1'), new QuestionModel('Qual meu nome?', 'Bonfa', ['Bonfim', 'errado 1', 'errado 2'], '1'), new QuestionModel('Qual meu nome?', 'Bonfa', ['Bonfim', 'errado 1', 'errado 2'], '1'));
}
exports.getMockQuestions = getMockQuestions;

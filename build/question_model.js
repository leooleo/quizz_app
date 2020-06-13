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
    return new Array(new QuestionModel('Quem sou eu?', 'Léo', ['Léo', 'Léo', 'Léo'], '1'), new QuestionModel('Quem sou eu?', 'Léo', ['Léo', 'Léo', 'Léo'], '1'), new QuestionModel('Quem sou eu?', 'Léo', ['Léo', 'Léo', 'Léo'], '1'), new QuestionModel('Quem sou eu?', 'Bonfa', ['Bonfa', 'Bonfa', 'Bonfa'], '1'), new QuestionModel('Quem sou eu?', 'Bonfa', ['Bonfa', 'Bonfa', 'Bonfa'], '1'), new QuestionModel('Quem sou eu?', 'Bonfa', ['Bonfa', 'Bonfa', 'Bonfa'], '1'));
}
exports.getMockQuestions = getMockQuestions;

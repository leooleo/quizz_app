"use strict";
exports.__esModule = true;
exports.QuizzQuestionModel = void 0;
var QuizzQuestionModel = /** @class */ (function () {
    function QuizzQuestionModel(questionModel) {
        this.question = questionModel.question;
        this.createdByUser = questionModel.createdByUser;
        this.possibleAnswers = questionModel.possibleAnswers;
    }
    return QuizzQuestionModel;
}());
exports.QuizzQuestionModel = QuizzQuestionModel;

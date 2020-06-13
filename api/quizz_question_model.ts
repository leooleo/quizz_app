import { QuestionModel } from "./question_model";

export class QuizzQuestionModel {
    question: string;
    createdByUser: string;
    possibleAnswers: Array<string>;

    constructor(questionModel: QuestionModel) {
        this.question = questionModel.question;
        this.createdByUser = questionModel.createdByUser;
        this.possibleAnswers = questionModel.possibleAnswers;
    }
}
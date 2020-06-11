export class QuestionModel {
    question: string;
    createdByUser: string
    possibleAnswers: Array<string>;
    correctAnswer: string;

    constructor(question: string, createdBy: string, answers: Array<string>, correctAnswer: string) {
        this.question = question;
        this.createdByUser = createdBy;
        this.possibleAnswers = answers;
        this.correctAnswer = correctAnswer;
    }
}

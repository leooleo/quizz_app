export class QuestionModel {
    question: string;
    possibleAnswers: Array<string>;

    constructor(question: string, answers: Array<string>) {
        this.question = question;
        this.possibleAnswers = answers;
    }
}

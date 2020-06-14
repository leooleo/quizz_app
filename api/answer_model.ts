export class AnswerModel {
    userName: string;
    answer: string;

    constructor(userName: string, answer: string) {
        this.userName = userName;
        this.answer = answer;
    }
}
export class QuestionModel {
    question: string;
    createdByUser: string;
    possibleAnswers: Array<string>;
    correctAnswer: string;

    constructor(question: string, createdByUser: string, possibleAnswers: Array<string>, correctAnswer: string) {
        this.question = question;
        this.createdByUser = createdByUser;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }
}

export function getMockQuestions(): Array<QuestionModel> {
    return new Array<QuestionModel>(
        new QuestionModel(
            'Qual meu nome inteiro?',
            'Léo',
            ['Léo Moraes da Silva', 'Méo Loraes', 'Xeo Moraes'],
            '1'
        ),
        new QuestionModel(
            'Quem sou eu?',
            'Léo',
            ['Léo', 'Léo', 'Léo'],
            '1'
        ),
        new QuestionModel(
            'Quem sou eu?',
            'Léo',
            ['Léo', 'Léo', 'Léo'],
            '1'
        ),
        new QuestionModel(
            'Quem sou eu?',
            'Bonfa',
            ['Bonfa', 'Bonfa', 'Bonfa'],
            '1'
        ),
        new QuestionModel(
            'Quem sou eu?',
            'Bonfa',
            ['Bonfa', 'Bonfa', 'Bonfa'],
            '1'
        ),
        new QuestionModel(
            'Quem sou eu?',
            'Bonfa',
            ['Bonfa', 'Bonfa', 'Bonfa'],
            '1'
        ),        
    )
}
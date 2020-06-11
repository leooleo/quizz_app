export class UserModel {
    name: string;
    score: number;
    hasAnswered: boolean;
    isLogged: boolean;
    photoUrl: string;

    constructor(name: string, score: number, hasAnswered: boolean, isLogged: boolean) {
        this.name = name;
        this.score = score;
        this.hasAnswered = hasAnswered;
        this.isLogged = isLogged;
        this.photoUrl = `http://localhost:8080/api/photo/${name}`;
    }    
}

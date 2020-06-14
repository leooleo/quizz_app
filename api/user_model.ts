export class UserModel {
    name: string;
    score: number;
    hasAnswered: boolean;
    isLogged: boolean;
    photoUrl: string;

    constructor(name: string, score: number, hasAnswered: boolean, isLogged: boolean, isLocal: boolean) {
        this.name = name;
        this.score = score;
        this.hasAnswered = hasAnswered;
        this.isLogged = isLogged;
        this.photoUrl = isLocal ? `http://localhost:8080/api/photo/${name}` : `https://salongaquizz.herokuapp.com/api/photo/${name}`;
    }
}

export function getInitialUserList(isLocal: boolean): Array<UserModel> {
    var userList: Array<UserModel> = new Array<UserModel>(
        new UserModel('Léo', 0, false, false, isLocal),
        // new UserModel('Nat', 0, false, false, isLocal),
        new UserModel('Bonfa', 0, false, false, isLocal),
        new UserModel('Mr.Doctor', 0, false, false, isLocal),
        // new UserModel('Loris', 0, false, false, isLocal),
        // new UserModel('Ernestão', 0, false, false, isLocal),
    );

    return userList;
}
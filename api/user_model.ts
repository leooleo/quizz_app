export class UserModel {
    name: string;
    score: Number;
    hasAnswered: Boolean;
    isLogged: Boolean;

    constructor(name: string, score: Number, hasAnswered: Boolean, isLogged: Boolean) {
        this.name = name;
        this.score = score;
        this.hasAnswered = hasAnswered;
        this.isLogged = isLogged;
    }
}

export function getInitialUserList(): Array<UserModel> {
    var userList: Array<UserModel> = new Array<UserModel>(
        new UserModel('Léo', 0, false, false),
        new UserModel('Nat', 0, false, false),
        new UserModel('Bonfa', 0, false, false),
        new UserModel('Mr Doc', 0, false, false),
        new UserModel('Ernestão', 0, false, false),
        new UserModel('Loreta', 0, false, false),
    );

    return userList;
}
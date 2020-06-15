"use strict";
exports.__esModule = true;
exports.getInitialUserList = exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel(name, score, hasAnswered, isLogged, isLocal) {
        this.name = name;
        this.score = score;
        this.hasAnswered = hasAnswered;
        this.isLogged = isLogged;
        this.photoUrl = isLocal ? "http://localhost:8080/api/photo/" + name : "https://salongaquizz.herokuapp.com/api/photo/" + name;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
function getInitialUserList(isLocal) {
    var userList = new Array(new UserModel('Léo', 0, false, false, isLocal), 
    // new UserModel('Nat', 0, false, false, isLocal),
    new UserModel('Bonfa', 0, false, false, isLocal), new UserModel('Mr.Doctor', 0, false, false, isLocal));
    return userList;
}
exports.getInitialUserList = getInitialUserList;

"use strict";
exports.__esModule = true;
exports.getInitialUserList = exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel(name, score, hasAnswered, isLogged) {
        this.name = name;
        this.score = score;
        this.hasAnswered = hasAnswered;
        this.isLogged = isLogged;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
function getInitialUserList() {
    var userList = new Array(new UserModel('Léo', 0, false, false), new UserModel('Nat', 0, false, false), new UserModel('Bonfa', 0, false, false), new UserModel('Mr Doc', 0, false, false), new UserModel('Ernestão', 0, false, false), new UserModel('Loreta', 0, false, false));
    return userList;
}
exports.getInitialUserList = getInitialUserList;

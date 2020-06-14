import { UserModel } from "./user_model";

export class ScoreModel {
    users: Array<UserModel>;
    winnners: Array<string>;
    loosers: Array<string>;
    
    constructor(users: Array<UserModel>, winnners: Array<string>, loosers: Array<string>) {
        this.users = users;
        this.winnners = winnners;
        this.loosers = loosers;
    }
}
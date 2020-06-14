import { UserModel } from './user-model';

export class ScoreModel {
    users: Array<UserModel>;
    winnners: Array<string>;
    loosers: Array<string>;
}

import { Injectable } from '@angular/core';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  storeUser(user: UserModel) {
    sessionStorage.setItem('user', JSON.stringify(user));
    var st = JSON.parse(sessionStorage.getItem('user'));
    console.log('Storing user:');
    console.log(st);
  }

  getStoredUser(): UserModel {
    var user = JSON.parse(sessionStorage.getItem('user'));
    console.log('Getting user:');
    console.log(user);
    return user;
  }
}

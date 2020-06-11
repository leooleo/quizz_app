import { Injectable } from '@angular/core';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedUser: UserModel;
  
  constructor() { }
}

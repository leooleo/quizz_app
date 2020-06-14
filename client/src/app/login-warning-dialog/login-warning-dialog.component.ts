import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-login-warning-dialog',
  templateUrl: './login-warning-dialog.component.html',
  styleUrls: ['./login-warning-dialog.component.css']
})
export class LoginWarningDialogComponent implements OnInit {
  user: UserModel;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getStoredUser();
  }

}

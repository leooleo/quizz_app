import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserModel } from '../user-model';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  usersForm = new FormControl();
  loading: boolean;
  availableUsers: UserModel[] = new Array<UserModel>();

  constructor(private apiService: ApiService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getAvailableUsers().subscribe((data: UserModel[]) => {
      console.log('receiving');
      console.log(data);
      this.availableUsers = data;
      this.loading = false;
    });
  }

  onSelected(selectedUser: UserModel) {
    this.loginService.loggedUser = selectedUser;
    if(!selectedUser.hasAnswered) {
      this.router.navigate(['/question']);  
    }
    else {
      this.router.navigate(['/quizz']);
    }    
  }
}

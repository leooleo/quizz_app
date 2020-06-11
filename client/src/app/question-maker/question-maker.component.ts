import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserModel } from '../user-model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './question-maker.component.html',
  styleUrls: ['./question-maker.component.css', '../app.component.css']
})
export class QuestionMakerComponent implements OnInit {
  user: UserModel;
  loading: boolean;
  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.loggedUser;
    if (this.user == undefined) {
      this.router.navigate(['/login']);
    }
  }

}

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
  userQuestionCount: Number;
  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.loggedUser;
    this.validateUser();
    this.getUserAnsweredQuestions();
  }

  private getUserAnsweredQuestions() {
    this.loading = true;
    this.apiService.getUserQuestions(this.user.name).subscribe((questions) => {
      this.userQuestionCount = questions.length;      
      this.loading = false;      
    });
  }

  private validateUser() {
    if (this.user == undefined) {
      // TODO: Remove this mock!
      this.user = new UserModel('Bonfa', 0, false, false);
      // this.router.navigate(['/login']);
    }
    else if(this.user.hasAnswered) {
      this.router.navigate(['/quizz']);
    }
  }
}

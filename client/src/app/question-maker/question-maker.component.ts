import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserModel } from '../user-model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { QuestionModel } from '../question-model';

@Component({
  templateUrl: './question-maker.component.html',
  styleUrls: ['./question-maker.component.css', '../app.component.css', '../login-page/login-page.component.css']
})
export class QuestionMakerComponent implements OnInit {
  user: UserModel;
  loading: boolean;
  userQuestionCount: Number;
  currentQuestion: QuestionModel;
  questionFormControl: FormControl;
  answersFormControl: FormControl;
  profileForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    firstAnswer: new FormControl('', [Validators.required]),
    secondAnswer: new FormControl('', [Validators.required]),
    thirdAnswer: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.loggedUser;
    this.questionFormControl = new FormControl('', [Validators.required]);
    this.answersFormControl = new FormControl('', [Validators.required]);
    this.validateUser();
    this.getUserAnsweredQuestions();
  }

  onSubmit() {
    if (!this.profileForm.valid) return;

    var model = new QuestionModel(
      this.profileForm.value.question,
      [
        this.profileForm.value.firstAnswer,
        this.profileForm.value.secondAnswer,
        this.profileForm.value.thirdAnswer
      ]);

    console.log(model);
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
    else if (this.user.hasAnswered) {
      this.router.navigate(['/quizz']);
    }
  }
}

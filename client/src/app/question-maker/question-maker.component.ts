import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserModel } from '../user-model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { QuestionModel } from '../question-model';
import { ServerResponse } from '../server-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './question-maker.component.html',
  styleUrls: ['./question-maker.component.css', '../app.component.css', '../login-page/login-page.component.css']
})
export class QuestionMakerComponent implements OnInit {
  user: UserModel;
  loading: boolean;
  userQuestionCount: number;
  currentQuestion: QuestionModel;
  profileForm = new FormGroup({
    question: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    firstAnswer: new FormControl('', [Validators.required]),
    secondAnswer: new FormControl('', [Validators.required]),
    thirdAnswer: new FormControl('', [Validators.required]),
    correctOption: new FormControl('1'),
  });

  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) { }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.user = this.loginService.getStoredUser();
    this.validateUser();
    this.getUserAnsweredQuestions();
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (!this.profileForm.valid) {
      this.snackBar.open('É necessário preencher todos os campos', 'Ok', { duration: 3000 });
      return;
    };

    var model = this.createModel();

    this.loading = true;
    this.apiService.sendQuestion(model).subscribe((response: ServerResponse) => {
      this.loading = false;
      if (response.message == 'ok') {
        this.snackBar.open('Pergunta registrada!', 'Ok', { duration: 3000 });
        formDirective.resetForm();
        this.profileForm.reset();
        this.profileForm.get('correctOption').setValue('1');
        this.userQuestionCount += 1;
      }
      else {
        this.snackBar.open('Erro desconhecido ' + response.message, 'Ok', { duration: 3000 })
      }
    });
  }

  private createModel(): QuestionModel {
    return new QuestionModel(
      this.profileForm.value.question,
      this.user.name,
      [
        this.profileForm.value.firstAnswer,
        this.profileForm.value.secondAnswer,
        this.profileForm.value.thirdAnswer
      ],
      this.profileForm.value.correctOption
    );
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
      this.router.navigate(['/login']);
    }
    else if (this.user.hasAnswered) {
      this.router.navigate(['/quizz']);
    }
  }

  routeToQuizz() {
    this.router.navigate(['/quizz']);
  }
}

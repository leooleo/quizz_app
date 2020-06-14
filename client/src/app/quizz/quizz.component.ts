import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UserModel } from '../user-model';
import { QuestionQuizzModel } from '../question-quizz-model';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { ScoreModel } from '../score-model';
import { AnswerModel } from '../answer-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', '../question-maker/question-maker.component.css', '../app.component.css',]
})
export class QuizzComponent implements OnInit {
  user: UserModel;
  watingForUsers: boolean;
  waitingMessage: string;
  loading: boolean;
  loadingUsers: boolean;
  currentQuestion: QuestionQuizzModel;
  proportionalTimeLeft: number;
  users: UserModel[];
  spinnerMode: ProgressSpinnerMode = "determinate";
  spinnerColor: ThemePalette = 'primary';
  buttonsAreEnabled: boolean;

  constructor(private socket: Socket, private loginService: LoginService,
    private router: Router, private apiService: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.loginService.getStoredUser();
    this.socket.connect();
    this.loading = true;
    this.validateUser();
    this.initializeEvents();
    this.loadUsers();
  }

  private loadUsers() {
    this.loadingUsers = true;
    this.apiService.getAvailableUsers().subscribe((data: UserModel[]) => {
      this.users = data;
      this.loadingUsers = false;
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  private validateUser() {
    if (this.user == undefined) {
      if (this.user == undefined) {
        this.router.navigate(['/login']);
      }
      else if (this.user.hasAnswered) {
        this.router.navigate(['/question']);
      }
    }
  }

  getUserOfQuestionPhoto(userName: string): string {
    return `${environment.serverUrl}/api/photo/${userName}`;
  }

  onAnswer(answer: string) {
    var answerIndex = this.currentQuestion.possibleAnswers.indexOf(answer) + 1;
    var answerModel = new AnswerModel(this.user.name, answerIndex.toString());
    this.buttonsAreEnabled = false;
    this.sendAnswer(answerModel);
    this.snackBar.open('Resposta enviada com sucesso', 'Ok', {duration: 3000});
  }

  private sendAnswer(answer: AnswerModel) {
    this.socket.emit('answer', answer);
  }

  private initializeEvents() {
    this.socket.fromEvent('waiting').subscribe((data: string) => {
      this.loading = false;
      this.watingForUsers = true;
      console.log('Waiting ' + data);
      this.waitingMessage = data;
    });

    this.socket.fromEvent('currentQuestion').subscribe((data: QuestionQuizzModel) => {
      this.watingForUsers = false;
      this.loading = false;
      this.buttonsAreEnabled = true;
      this.spinnerColor = 'primary';
      console.log('Current question');
      console.log(data);
      this.currentQuestion = data;
    });

    this.socket.fromEvent('timer').subscribe((data: number) => {
      this.proportionalTimeLeft = data;
      if (data <= 45) {
        this.spinnerColor = 'warn';
      }
      if (data == 0) {
        this.buttonsAreEnabled = false;
      }
    });

    this.socket.fromEvent('score').subscribe((data: ScoreModel) => {
      this.users = data.users;
      console.log(data);
    });
  }


}

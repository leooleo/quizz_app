import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UserModel } from '../user-model';
import { QuestionQuizzModel } from '../question-quizz-model';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', '../question-maker/question-maker.component.css',  '../app.component.css',]
})
export class QuizzComponent implements OnInit {
  user: UserModel;
  watingForUsers: boolean;
  waitingMessage: string;
  loading: boolean;
  loadingUsers: boolean;
  currentQuestion: QuestionQuizzModel;
  users: UserModel[];
  constructor(private socket: Socket, private loginService: LoginService, private router: Router, private apiService: ApiService) { }

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
      console.log('Current question');
      console.log(data);
      this.currentQuestion = data;
    });
  }


}

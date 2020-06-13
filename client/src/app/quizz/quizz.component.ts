import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UserModel } from '../user-model';
import { QuestionQuizzModel } from '../question-quizz-model';

@Component({
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  user: UserModel;
  constructor(private socket: Socket, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.loggedUser;
    this.validateUser();
    this.initializeEvents();
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

  private initializeEvents() {
    this.socket.fromEvent('waiting').subscribe((data: string) => {
      console.log('Waiting ' + data);
    });

    this.socket.fromEvent('currentQuestion').subscribe((data: QuestionQuizzModel) => {
      console.log('Current question');
      console.log(data);
    });
  }


}

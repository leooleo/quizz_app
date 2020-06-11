import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../login.service';

@Component({
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  constructor(private socket: Socket, private loginService: LoginService) { }

  ngOnInit(): void {
    console.log(this.loginService.loggedUser);
    this.socket.fromEvent("message").subscribe((data: string) => { 
      console.log('[WSS] ' + data) 
    });
  }
  getMessage() {
    

  }


}

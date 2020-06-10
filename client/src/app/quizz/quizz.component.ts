import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.fromEvent("message").subscribe((data: string) => { 
      console.log('receiving ' + data) 
    });
  }
  getMessage() {
    

  }


}

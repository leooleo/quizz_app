import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  toppings = new FormControl();

  userList: string[] = ['Léo', 'Bonfa', 'Ernesto', 'Nat'];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  toppings = new FormControl();

  userList = [{ 'name': 'Léo', photoUrl: 'http://localhost:8080/photo/Léo' },
  { 'name': 'Bonfa', photoUrl: 'http://localhost:8080/photo/Bonfa' },
  { 'name': 'Loris', photoUrl: 'http://localhost:8080/photo/Loris' },
  { 'name': 'Nat', photoUrl: 'http://localhost:8080/photo/Nat' },];

  constructor() { }

  ngOnInit(): void {
  }

}

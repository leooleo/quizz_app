import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  toppings = new FormControl();

  userList = [{ 'name': 'Léo', photoUrl: 'http://localhost:8080/api/photo/Léo' },
  { 'name': 'Bonfa', photoUrl: 'http://localhost:8080/api/photo/Bonfa' },
  { 'name': 'Loris', photoUrl: 'http://localhost:8080/api/photo/Loris' },
  { 'name': 'Nat', photoUrl: 'http://localhost:8080/api/photo/Nat' },];

  constructor() { }

  ngOnInit(): void {
  }

}

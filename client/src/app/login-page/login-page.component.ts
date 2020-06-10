import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  toppings = new FormControl();

  userList = [{ 'name': 'Léo', photoUrl: '/api/photo/Léo' },
  { 'name': 'Bonfa', photoUrl: '/api/photo/Bonfa' },
  { 'name': 'Loris', photoUrl: '/api/photo/Loris' },
  { 'name': 'Nat', photoUrl: '/api/photo/Nat' },];

  constructor() { }

  ngOnInit(): void {
  }

}

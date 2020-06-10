import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserModel } from '../user-model';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  toppings = new FormControl();
  loading: boolean;
  availableUsers: UserModel[] = new Array<UserModel>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getAvailableUsers().subscribe((data: UserModel[]) => {
      console.log('receiving');
      console.log(data);
      this.availableUsers = data;
      this.loading = false;
    });
  }

}

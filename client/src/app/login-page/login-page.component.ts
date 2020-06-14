import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserModel } from '../user-model';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginWarningDialogComponent } from '../login-warning-dialog/login-warning-dialog.component';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../app.component.css'],
})
export class LoginPageComponent implements OnInit {
  usersForm = new FormControl();
  loading: boolean;
  availableUsers: UserModel[] = new Array<UserModel>();
  user: UserModel;

  constructor(private apiService: ApiService, private loginService: LoginService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getAvailableUsers().subscribe((data: UserModel[]) => {
      console.log('receiving');
      console.log(data);
      this.availableUsers = data;
      this.loading = false;
    });
    this.checkForStoredUser();
  }

  private checkForStoredUser() {
    this.user = this.loginService.getStoredUser();
    if (this.user != undefined) {
      this.openWarningDialog();
    }
  }

  private openWarningDialog() {
    var dialogRef = this.dialog.open(LoginWarningDialogComponent);
    dialogRef.afterClosed().subscribe((shouldRedirect: boolean) => {
      if (shouldRedirect) {
        this.navigateToNextRoute();
      }
    });
  }

  onSelected(selectedUser: UserModel) {
    this.user = selectedUser;
    this.loginService.storeUser(selectedUser);
    this.navigateToNextRoute();
  }

  private navigateToNextRoute() {
    if (!this.user.hasAnswered) {
      this.router.navigate(['/question']);
    }
    else {
      this.router.navigate(['/quizz']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginData, LoginResult } from '@interfaces/interfaces';
import User from '@model/user.model';
import ApiService from '@services/api.service';
import AuthService from '@services/auth.service';
import UserService from '@services/user.service';

@Component({
  selector: 'void-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export default class LoginComponent implements OnInit {
  loginData: LoginData = {
    name: '',
    pass: '',
  };
  loginError: boolean = false;
  loginSending: boolean = false;

  constructor(
    private as: ApiService,
    private us: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  doLogin(): void {
    if (this.loginData.name === '' || this.loginData.pass === '') {
      return;
    }

    this.loginSending = true;
    this.as.login(this.loginData).subscribe((result: LoginResult): void => {
      this.loginSending = false;
      if (result.status === 'ok') {
        this.us.logged = true;
        this.us.user = new User().fromInterface(result.user);
        this.us.saveLogin();

        this.router.navigate(['/home']);
      } else {
        this.loginError = true;
      }
    });
  }
}

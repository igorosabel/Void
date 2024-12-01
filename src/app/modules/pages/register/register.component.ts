import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginResult, RegisterData } from '@interfaces/interfaces';
import User from '@model/user.model';
import ApiService from '@services/api.service';
import UserService from '@services/user.service';

@Component({
  selector: 'void-register',
  templateUrl: './register.component.html',
  imports: [
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export default class RegisterComponent {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private router: Router = inject(Router);

  registerData: RegisterData = {
    name: '',
    email: '',
    pass: '',
    conf: '',
  };
  registerNameError: boolean = false;
  registerEmailError: boolean = false;
  registerPassError: boolean = false;
  registerSending: boolean = false;

  doRegister(): void {
    if (
      this.registerData.name === '' ||
      this.registerData.email === '' ||
      this.registerData.pass === '' ||
      this.registerData.conf === ''
    ) {
      return;
    }

    this.registerNameError = false;
    this.registerEmailError = false;
    this.registerPassError = false;
    if (this.registerData.pass !== this.registerData.conf) {
      this.registerPassError = true;
      return;
    }

    this.registerSending = true;
    this.as
      .register(this.registerData)
      .subscribe((result: LoginResult): void => {
        this.registerSending = false;
        if (result.status === 'ok') {
          this.us.logged = true;
          this.us.user = new User().fromInterface(result.user);
          this.us.saveLogin();

          this.router.navigate(['/home']);
        } else {
          if (result.status == 'name') {
            this.registerNameError = true;
          }
          if (result.status == 'email') {
            this.registerEmailError = true;
          }
        }
      });
  }
}

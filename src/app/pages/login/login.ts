import { Component, inject, signal, WritableSignal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import AuthStore from '@auth/auth.store';
import { LoginPayload, LoginResponse } from '@interfaces/interfaces';
import AuthService from '@services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    MatToolbar,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
    FormRoot,
    FormField,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {
  private auth: AuthService = inject(AuthService);
  private authStore: AuthStore = inject(AuthStore);
  private router: Router = inject(Router);

  private readonly loginModel: WritableSignal<LoginPayload> = signal({
    email: '',
    password: '',
  });

  readonly loginForm = form(this.loginModel, (path) => {
    required(path.email);
    email(path.email);
    required(path.password);
  });

  hidePassword: WritableSignal<boolean> = signal(true);
  submitting: WritableSignal<boolean> = signal(false);
  serverError: WritableSignal<string | null> = signal<string | null>(null);

  toggleHidePassword(): void {
    this.hidePassword.update((v: boolean): boolean => !v);
  }

  async submit(): Promise<void> {
    this.serverError.set(null);
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const { email, password }: LoginPayload = this.loginForm().value();
      const response: LoginResponse = await this.auth.login({
        email,
        password,
      });
      this.authStore.applyLoginResponse(response);
      this.loginForm().reset({ email: '', password: '' });
      this.router.navigateByUrl('/game/home');
    } catch (e: unknown) {
      const msg: string =
        e instanceof Error ? e.message : 'Nombre de usuario o contraseña incorrectos.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}

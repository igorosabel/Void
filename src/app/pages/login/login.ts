import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import AuthStore from '@auth/auth.store';
import { LoginResponse } from '@interfaces/interfaces';
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
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthService = inject(AuthService);
  private authStore: AuthStore = inject(AuthStore);
  private router: Router = inject(Router);

  form = this.fb.group({
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control<string>('', {
      validators: [Validators.required],
    }),
  });
  hidePassword: WritableSignal<boolean> = signal(true);
  submitting: WritableSignal<boolean> = signal(false);
  serverError: WritableSignal<string | null> = signal<string | null>(null);

  email = () => this.form.get('email');
  password = () => this.form.get('password');

  toggleHidePassword(): void {
    this.hidePassword.update((v: boolean): boolean => !v);
  }

  async submit(): Promise<void> {
    this.serverError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const response: LoginResponse = await this.auth.login({
        email: this.email()!.value!,
        password: this.password()!.value!,
      });
      this.authStore.applyLoginResponse(response);
      this.form.reset();
      this.router.navigateByUrl('/game/home');
    } catch (e: unknown) {
      const msg: string =
        e instanceof Error
          ? e.message
          : 'Nombre de usuario o contraseña incorrectos.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}

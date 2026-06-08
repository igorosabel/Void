import {
  Component,
  computed,
  inject,
  resource,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  required,
  validate,
  validateAsync,
  validateTree,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import AuthStore from '@auth/auth.store';
import { LoginResponse, PasswordStrengthType, RegisterForm } from '@interfaces/interfaces';
import AuthService from '@services/auth-service';

@Component({
  selector: 'app-register',
  imports: [
    MatToolbar,
    FormRoot,
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  host: { class: 'block' },
})
export default class RegisterComponent {
  private auth: AuthService = inject(AuthService);
  private authStore: AuthStore = inject(AuthStore);
  private router: Router = inject(Router);

  hidePassword: WritableSignal<boolean> = signal(true);
  hideConfirm: WritableSignal<boolean> = signal(true);
  submitting: WritableSignal<boolean> = signal(false);
  serverError: WritableSignal<string | null> = signal<string | null>(null);

  private readonly registerModel: WritableSignal<RegisterForm> = signal({
    email: '',
    nickname: '',
    passwordGroup: {
      password: '',
      confirm: '',
    },
    acceptTerms: false,
  });

  readonly registerForm = form(this.registerModel, (path) => {
    required(path.email);
    email(path.email);
    validateAsync(path.email, {
      params: ({ value }) => value().trim(),
      debounce: 300,
      factory: (emailParam) =>
        resource({
          params: () => emailParam(),
          loader: ({ params }) => this.auth.checkEmailAvailable(params),
        }),
      onSuccess: (isFree) => (isFree ? undefined : { kind: 'emailTaken' }),
      onError: () => undefined,
      when: ({ value }) => value().trim().length > 0,
    });

    required(path.nickname);
    minLength(path.nickname, 3);
    maxLength(path.nickname, 50);

    required(path.passwordGroup.password);
    minLength(path.passwordGroup.password, 8);
    validate(path.passwordGroup.password, ({ value }) =>
      this.hasComplexity(value()) ? undefined : { kind: 'complexity' },
    );

    required(path.passwordGroup.confirm);
    validateTree(path.passwordGroup, ({ fieldTreeOf, value }) => {
      const { password, confirm } = value();
      return password && confirm && password !== confirm
        ? {
            kind: 'passwordMismatch',
            fieldTree: fieldTreeOf(path.passwordGroup.confirm),
          }
        : undefined;
    });

    validate(path.acceptTerms, ({ value }) => (value() ? undefined : { kind: 'required' }));
  });

  passwordStrength: Signal<PasswordStrengthType> = computed<PasswordStrengthType>(
    (): PasswordStrengthType => {
      const v: string = this.registerForm.passwordGroup.password().value();
      let score: number = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
      if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) score++;
      return score >= 3 ? 'fuerte' : score === 2 ? 'medio' : 'debil';
    },
  );

  private hasComplexity(value: string): boolean {
    if (!value) return true;
    const rules: boolean[] = [
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /\d/.test(value),
      /[^A-Za-z0-9]/.test(value),
    ];
    return rules.filter(Boolean).length >= 3;
  }

  toggleHidePassword(): void {
    this.hidePassword.update((v: boolean): boolean => !v);
  }

  toggleHideConfirm(): void {
    this.hideConfirm.update((v: boolean): boolean => !v);
  }

  async submit(): Promise<void> {
    this.serverError.set(null);
    if (this.registerForm().invalid()) {
      this.registerForm().markAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const { email, nickname, passwordGroup, acceptTerms }: RegisterForm =
        this.registerForm().value();
      const response: LoginResponse = await this.auth.register({
        email,
        nickname,
        password: passwordGroup.password,
        acceptTerms,
      });
      this.authStore.applyLoginResponse(response);
      this.registerForm().reset({
        email: '',
        nickname: '',
        passwordGroup: {
          password: '',
          confirm: '',
        },
        acceptTerms: false,
      });
      this.router.navigateByUrl('/game/home');
    } catch (e: unknown) {
      const msg: string =
        e instanceof Error ? e.message : 'Error inesperado al registrar la cuenta.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}

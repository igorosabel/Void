import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import passwordMatchValidator from '@auth/password-match.validator';
import { LoginResponse, PasswordStrengthType } from '@interfaces/interfaces';
import AuthService from '@services/auth.service';
import { debounceTime, first, map, of, switchMap } from 'rxjs';

function emailAvailabilityValidator(
  svc = inject(AuthService)
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const value = (control.value ?? '').trim();
    if (!value || control.invalid) return of(null);
    return of(value).pipe(
      debounceTime(300),
      switchMap((v) => svc.checkEmailAvailable(v)),
      map((isFree) => (isFree ? null : { emailTaken: true })),
      first()
    );
  };
}

@Component({
  selector: 'app-register',
  imports: [
    MatToolbar,
    ReactiveFormsModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthService = inject(AuthService);

  hidePassword: WritableSignal<boolean> = signal(true);
  hideConfirm: WritableSignal<boolean> = signal(true);
  submitting: WritableSignal<boolean> = signal(false);
  serverError: WritableSignal<string | null> = signal<string | null>(null);

  form = this.fb.group({
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailAvailabilityValidator()],
      updateOn: 'blur',
    }),
    nickname: this.fb.control<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    passwordGroup: this.fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(8), this.hasComplexity()],
        ],
        confirm: ['', [Validators.required]],
      },
      { validators: [passwordMatchValidator('password', 'confirm')] }
    ),
    acceptTerms: this.fb.control<boolean>(false, [Validators.requiredTrue]),
  });

  email = () => this.form.get('email');
  nickname = () => this.form.get('nickname');
  passwordGroup = () => this.form.get('passwordGroup');
  password = () => this.form.get('passwordGroup.password');
  confirm = () => this.form.get('passwordGroup.confirm');
  acceptTerms = () => this.form.get('acceptTerms');

  private passwordValue: Signal<string | null> = toSignal(
    this.password()?.valueChanges ?? of(''),
    {
      initialValue: '',
    }
  );

  passwordStrength: Signal<PasswordStrengthType> =
    computed<PasswordStrengthType>((): PasswordStrengthType => {
      const v: string = String(this.passwordValue() ?? '');
      let score: number = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
      if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) score++;
      return score >= 3 ? 'fuerte' : score === 2 ? 'medio' : 'debil';
    });

  private hasComplexity() {
    return (ctrl: AbstractControl) => {
      const v: string = String(ctrl.value ?? '');
      if (!v) return null;
      const rules: boolean[] = [
        /[A-Z]/.test(v),
        /[a-z]/.test(v),
        /\d/.test(v),
        /[^A-Za-z0-9]/.test(v),
      ];
      return rules.filter(Boolean).length >= 3 ? null : { complexity: true };
    };
  }

  toggleHidePassword(): void {
    this.hidePassword.update((v: boolean): boolean => !v);
  }

  toggleHideConfirm(): void {
    this.hideConfirm.update((v: boolean): boolean => !v);
  }

  async submit(): Promise<void> {
    this.serverError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const response: LoginResponse = await this.auth.register({
        email: this.email()!.value!,
        nickname: this.nickname()!.value!,
        password: this.password()!.value!,
        acceptTerms: this.acceptTerms()!.value!,
      });
      console.log('Register response:', response);
      this.form.reset();
      // TODO: router.navigateByUrl('/auth/login') o '/game/system'
    } catch (e: unknown) {
      const msg: string =
        e instanceof Error
          ? e.message
          : 'Error inesperado al registrar la cuenta.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}

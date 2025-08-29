import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
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
import passwordMatchValidator from '@auth/password-match.validator';
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  // estado local con signals
  hidePassword = signal(true);
  hideConfirm = signal(true);
  submitting = signal(false);
  serverError = signal<string | null>(null);

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

  // accesores cómodos para el template (compatibles con signals en @if)
  email = () => this.form.get('email');
  nickname = () => this.form.get('nickname');
  passwordGroup = () => this.form.get('passwordGroup');
  password = () => this.form.get('passwordGroup.password');
  confirm = () => this.form.get('passwordGroup.confirm');
  acceptTerms = () => this.form.get('acceptTerms');

  // derivado (computed) de la fuerza de la contraseña usando toSignal()
  private passwordValue = toSignal(this.password()?.valueChanges ?? of(''), {
    initialValue: '',
  });

  passwordStrength = computed<'weak' | 'medium' | 'strong'>(() => {
    const v = String(this.passwordValue() ?? '');
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) score++;
    return score >= 3 ? 'strong' : score === 2 ? 'medium' : 'weak';
  });

  private hasComplexity() {
    return (ctrl: AbstractControl) => {
      const v = String(ctrl.value ?? '');
      if (!v) return null;
      const rules = [
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

  async submit() {
    this.serverError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      await this.auth.register({
        email: this.email()!.value!,
        nickname: this.nickname()!.value!,
        password: this.password()!.value!,
        acceptTerms: this.acceptTerms()!.value!,
      });
      this.form.reset();
      // TODO: router.navigateByUrl('/auth/login') o '/game/system'
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : 'Error inesperado al registrar la cuenta.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}

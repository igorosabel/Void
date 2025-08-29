import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function passwordMatchValidator(
  passCtrlName = 'password',
  confirmCtrlName = 'confirm'
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass: string = group.get(passCtrlName)?.value;
    const confirm: string = group.get(confirmCtrlName)?.value;
    if (pass && confirm && pass !== confirm) {
      group.get(confirmCtrlName)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  };
}

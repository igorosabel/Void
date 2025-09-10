// app/shared/auth/auth.guard.ts
import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth.store';

const AuthGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (store.isAuthenticated()) return true;

  // Si no hay access token válido, prueba a entrar con refresh en el interceptor (opcional),
  // o redirige a login directamente:
  router.navigateByUrl('/');
  return false;
};

export default AuthGuard;

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import AuthService from '@services/auth.service';

function isLoggedGuardFn(): CanActivateFn {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router: Router = inject(Router);
    const isLoggedIn: boolean = authService.isAuthenticated();
    if (!isLoggedIn) {
      router.navigate(['/']);
    }
    return isLoggedIn;
  };
}
export default isLoggedGuardFn;

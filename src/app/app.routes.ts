import { Routes } from '@angular/router';
import isLoggedGuardFn from '@app/guard/auth.guard.fn';
import LoginComponent from '@pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'register',
    loadComponent: () => import('@pages/register/register.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component'),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: 'navigate',
    loadComponent: () => import('@pages/navigate/navigate.component'),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: 'ship',
    loadComponent: () => import('@pages/ship/ship.component'),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: 'messages',
    loadComponent: () => import('@pages/messages/messages.component'),
    canActivate: [isLoggedGuardFn],
  },
];
export default routes;

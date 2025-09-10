import { Routes } from '@angular/router';
import AuthGuard from '@guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/login/login').then((m) => m.default),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@pages/register/register').then((m) => m.default),
  },

  // app protegida
  {
    path: 'game',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@layout/game-shell/game-shell').then((m) => m.default),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('@pages/home/home').then((m) => m.default),
      },
      {
        path: 'system',
        loadComponent: () =>
          import('@pages/system/system').then((m) => m.default),
      },
      {
        path: 'ship',
        loadComponent: () => import('@pages/ship/ship').then((m) => m.default),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('@pages/messages/messages').then((m) => m.default),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('@pages/profile/profile').then((m) => m.default),
      },
    ],
  },

  { path: '**', redirectTo: '/' },
];

export default routes;

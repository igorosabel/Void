import { Routes } from "@angular/router";
import { isLoggedGuardFn } from "src/app/guard/auth.guard.fn";
import { LoginComponent } from "src/app/modules/pages/login/login.component";

export const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "register",
    loadComponent: () =>
      import("src/app/modules/pages/register/register.component"),
  },
  {
    path: "home",
    loadComponent: () => import("src/app/modules/pages/home/home.component"),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: "navigate",
    loadComponent: () =>
      import("src/app/modules/pages/navigate/navigate.component"),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: "ship",
    loadComponent: () => import("src/app/modules/pages/ship/ship.component"),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: "messages",
    loadComponent: () =>
      import("src/app/modules/pages/messages/messages.component"),
    canActivate: [isLoggedGuardFn],
  },
];

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { isLoggedGuardFn } from "src/app/guard/auth.guard.fn";
import { LoginComponent } from "src/app/modules/pages/login/login.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "register",
    loadComponent: () =>
      import("src/app/modules/pages/register/register.component"),
  },
  {
    path: "home",
    loadComponent: () => import("src/app/modules/pages/home/home.component"),
    canActivate: ["CanActivateFn"],
  },
  {
    path: "navigate",
    loadComponent: () =>
      import("src/app/modules/pages/navigate/navigate.component"),
    canActivate: ["CanActivateFn"],
  },
  {
    path: "ship",
    loadComponent: () => import("src/app/modules/pages/ship/ship.component"),
    canActivate: ["CanActivateFn"],
  },
  {
    path: "messages",
    loadComponent: () =>
      import("src/app/modules/pages/messages/messages.component"),
    canActivate: ["CanActivateFn"],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: "CanActivateFn", useFactory: isLoggedGuardFn }],
})
export class AppRoutingModule {}

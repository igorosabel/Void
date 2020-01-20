import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }            from './guard/auth.guard';
import { LoginComponent }       from './pages/login/login.component';
import { RegisterComponent }    from './pages/register/register.component';
import { HomeComponent }        from './pages/home/home.component';
import { NavigateComponent }    from './pages/navigate/navigate.component';
import { ShipComponent }        from './pages/ship/ship.component';
import { MessagesComponent }    from './pages/messages/messages.component';

const routes: Routes = [
	{ path: '',         component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'home',     component: HomeComponent,     canActivate: [AuthGuard] },
	{ path: 'navigate', component: NavigateComponent, canActivate: [AuthGuard] },
	{ path: 'ship',     component: ShipComponent,     canActivate: [AuthGuard] },
	{ path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

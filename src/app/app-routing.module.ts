import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }            from 'src/app/guard/auth.guard';
import { LoginComponent }       from 'src/app/pages/login/login.component';
import { RegisterComponent }    from 'src/app/pages/register/register.component';
import { HomeComponent }        from 'src/app/pages/home/home.component';
import { NavigateComponent }    from 'src/app/pages/navigate/navigate.component';
import { ShipComponent }        from 'src/app/pages/ship/ship.component';
import { MessagesComponent }    from 'src/app/pages/messages/messages.component';

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

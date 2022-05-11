import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm }            from '@angular/forms';
import { LoginData }         from 'src/app/interfaces/interfaces';
import { ApiService }        from 'src/app/services/api.service';
import { UserService }       from 'src/app/services/user.service';
import { AuthService }       from 'src/app/services/auth.service';
import { User }              from 'src/app/model/user.model';

@Component({
	selector: 'void-login',
	templateUrl: './login.component.html',
	styleUrls: []
})
export class LoginComponent implements OnInit {
	loginData: LoginData = {
		name: '',
		pass: ''
	};
	loginError: boolean = false;
	loginSending: boolean = false;

	constructor(
		private as: ApiService,
		private us: UserService,
		private router: Router,
		private auth: AuthService
	) {}

	ngOnInit(): void {
		if (this.auth.isAuthenticated()){
			this.router.navigate(['/home']);
		}
	}

	doLogin(f: NgForm): void {
		if (this.loginData.name==='' || this.loginData.pass===''){
			return;
		}

		this.loginSending = true;
		this.as.login(this.loginData).subscribe(result => {
			this.loginSending = false;
			if (result.status==='ok'){
				this.us.logged = true;
				this.us.user = new User().fromInterface(result.user);
				this.us.saveLogin();

				this.router.navigate(['/home']);
			}
			else{
				this.loginError = true;
			}
		});
	}
}

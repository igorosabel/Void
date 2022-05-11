import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm }            from '@angular/forms';
import { LoginData }         from 'src/app/interfaces/interfaces';
import { ApiService }        from 'src/app/services/api.service';
import { UserService }       from 'src/app/services/user.service';
import { CommonService }     from 'src/app/services/common.service';
import { AuthService }       from 'src/app/services/auth.service';

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
		private user: UserService,
		private cs: CommonService,
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
				this.user.logged = true;
				this.user.id     = result.id;
				this.user.name   = this.cs.urldecode(result.name);
				this.user.token  = this.cs.urldecode(result.token);
				this.user.saveLogin();

				this.router.navigate(['/home']);
			}
			else{
				this.loginError = true;
			}
		});
	}
}
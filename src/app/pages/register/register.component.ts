import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm }            from '@angular/forms';
import { RegisterData }      from 'src/app/interfaces/interfaces';
import { ApiService }        from 'src/app/services/api.service';
import { UserService }       from 'src/app/services/user.service';
import { CommonService }     from 'src/app/services/common.service';

@Component({
  selector: 'void-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
	registerData: RegisterData = {
		name: '',
		email: '',
		pass: '',
		conf: ''
	};
	registerNameError: boolean = false;
	registerEmailError: boolean = false;
	registerPassError: boolean = false;
	registerSending: boolean = false;

	constructor(
		private as: ApiService,
		private user: UserService,
		private cs: CommonService,
		private router: Router
	) {}

	ngOnInit(): void {}

	doRegister(f: NgForm): void {
		if (this.registerData.name==='' || this.registerData.email==='' || this.registerData.pass==='' || this.registerData.conf==='') {
			return;
		}
		
		this.registerNameError = false;
		this.registerEmailError = false;
		this.registerPassError = false;
		if (this.registerData.pass !== this.registerData.conf){
			this.registerPassError = true;
			return;
		}
		
		this.registerSending = true;
		this.as.register(this.registerData).subscribe(result => {
			this.registerSending = false;
			if (result.status==='ok') {
				this.user.logged = true;
				this.user.id     = result.id;
				this.user.name   = this.cs.urldecode(result.name);
				this.user.token  = this.cs.urldecode(result.token);
				this.user.saveLogin();
				
				this.router.navigate(['/home']);
			}
			else{
				if (result.status=='name') {
					this.registerNameError = true;
				}
				if (result.status=='email') {
					this.registerEmailError = true;
				}
			}
		});
	}
}
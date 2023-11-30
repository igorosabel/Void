import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { LoginResult, RegisterData } from "src/app/interfaces/interfaces";
import { User } from "src/app/model/user.model";
import { MaterialModule } from "src/app/modules/material/material.module";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";

@Component({
  standalone: true,
  selector: "void-register",
  templateUrl: "./register.component.html",
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
})
export default class RegisterComponent {
  registerData: RegisterData = {
    name: "",
    email: "",
    pass: "",
    conf: "",
  };
  registerNameError: boolean = false;
  registerEmailError: boolean = false;
  registerPassError: boolean = false;
  registerSending: boolean = false;

  constructor(
    private as: ApiService,
    private us: UserService,
    private router: Router
  ) {}

  doRegister(): void {
    if (
      this.registerData.name === "" ||
      this.registerData.email === "" ||
      this.registerData.pass === "" ||
      this.registerData.conf === ""
    ) {
      return;
    }

    this.registerNameError = false;
    this.registerEmailError = false;
    this.registerPassError = false;
    if (this.registerData.pass !== this.registerData.conf) {
      this.registerPassError = true;
      return;
    }

    this.registerSending = true;
    this.as
      .register(this.registerData)
      .subscribe((result: LoginResult): void => {
        this.registerSending = false;
        if (result.status === "ok") {
          this.us.logged = true;
          this.us.user = new User().fromInterface(result.user);
          this.us.saveLogin();

          this.router.navigate(["/home"]);
        } else {
          if (result.status == "name") {
            this.registerNameError = true;
          }
          if (result.status == "email") {
            this.registerEmailError = true;
          }
        }
      });
  }
}

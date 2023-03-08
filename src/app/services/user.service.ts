import { Injectable } from "@angular/core";
import { UserInterface } from "src/app/interfaces/interfaces";
import { User } from "src/app/model/user.model";

@Injectable()
export class UserService {
  logged: boolean = false;
  user: User = null;

  constructor() {}

  loadLogin(): void {
    const loginStr: string = localStorage.getItem("login");
    const loginObj: UserInterface = JSON.parse(loginStr);
    if (loginObj === null) {
      this.logout();
    } else {
      this.logged = true;
      this.user = new User().fromInterface(loginObj);
    }
  }

  saveLogin(): void {
    localStorage.setItem("login", JSON.stringify(this.user.toInterface()));
  }

  logout(): void {
    this.logged = false;
    this.user = null;
    localStorage.removeItem("login");
  }
}

import { Injectable } from '@angular/core';
import { UserInterface } from '@interfaces/interfaces';
import User from '@model/user.model';

@Injectable()
export default class UserService {
  logged: boolean = false;
  user: User | null = null;

  loadLogin(): void {
    const loginStr: string | null = localStorage.getItem('login');
    if (loginStr === null) {
      this.logout();
    } else {
      const loginObj: UserInterface = JSON.parse(loginStr);
      if (loginObj === null) {
        this.logout();
      } else {
        this.logged = true;
        this.user = new User().fromInterface(loginObj);
      }
    }
  }

  saveLogin(): void {
    if (this.user !== null) {
      localStorage.setItem('login', JSON.stringify(this.user.toInterface()));
    }
  }

  logout(): void {
    this.logged = false;
    this.user = null;
    localStorage.removeItem('login');
  }
}

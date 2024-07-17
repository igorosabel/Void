import { UserInterface } from '@interfaces/interfaces';
import Utils from '@model/utils.class';

export default class User {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public token: string | null = null
  ) {}

  fromInterface(u: UserInterface): User {
    this.id = u.id;
    this.name = Utils.urldecode(u.name);
    this.token = Utils.urldecode(u.token);

    return this;
  }

  toInterface(): UserInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      token: Utils.urlencode(this.token),
    };
  }
}

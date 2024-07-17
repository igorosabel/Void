import { SystemConnectionInterface } from '@interfaces/interfaces';
import Utils from '@model/utils.class';

export default class SystemConnection {
  constructor(
    public idSystemEnd: number | null = null,
    public order: number | null = null,
    public navigateTime: number | null = null,
    public name: string | null = null
  ) {}

  fromInterface(sc: SystemConnectionInterface): SystemConnection {
    this.idSystemEnd = sc.idSystemEnd;
    this.order = sc.order;
    this.navigateTime = sc.navigateTime;
    this.name = Utils.urldecode(sc.name);

    return this;
  }

  toInterface(): SystemConnectionInterface {
    return {
      idSystemEnd: this.idSystemEnd,
      order: this.order,
      navigateTime: this.navigateTime,
      name: Utils.urlencode(this.name),
    };
  }
}

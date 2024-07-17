import { ShortMessageInterface } from '@interfaces/interfaces';
import Utils from '@model/utils.class';

export default class ShortMessage {
  constructor(
    public id: number | null = null,
    public type: number | null = null,
    public name: string | null = null,
    public date: string | null = null,
    public message: string | null = null
  ) {}

  fromInterface(sm: ShortMessageInterface): ShortMessage {
    this.id = sm.id;
    this.type = sm.type;
    this.name = Utils.urldecode(sm.name);
    this.date = Utils.urldecode(sm.date);
    this.message = Utils.urldecode(sm.message);

    return this;
  }

  toInterface(): ShortMessageInterface {
    return {
      id: this.id,
      type: this.type,
      name: Utils.urlencode(this.name),
      date: Utils.urlencode(this.date),
      message: Utils.urlencode(this.message),
    };
  }
}

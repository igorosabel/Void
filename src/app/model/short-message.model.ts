import { ShortMessageInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

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
    this.name = urldecode(sm.name);
    this.date = urldecode(sm.date);
    this.message = urldecode(sm.message);

    return this;
  }

  toInterface(): ShortMessageInterface {
    return {
      id: this.id,
      type: this.type,
      name: urlencode(this.name),
      date: urlencode(this.date),
      message: urlencode(this.message),
    };
  }
}

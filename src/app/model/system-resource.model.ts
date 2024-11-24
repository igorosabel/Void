import { SystemResourceInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class SystemResource {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public value: number | null = null
  ) {}

  fromInterface(sr: SystemResourceInterface): SystemResource {
    this.id = sr.id;
    this.name = urldecode(sr.name);
    this.value = sr.value;

    return this;
  }

  toInterface(): SystemResourceInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      value: this.value,
    };
  }
}

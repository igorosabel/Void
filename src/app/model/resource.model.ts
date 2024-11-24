import { ResourceInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Resource {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public credits: number | null = null
  ) {}

  fromInterface(r: ResourceInterface): Resource {
    this.id = r.id;
    this.name = urldecode(r.name);
    this.credits = r.credits;

    return this;
  }

  toInterface(): ResourceInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      credits: this.credits,
    };
  }
}

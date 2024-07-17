import { ResourceInterface } from '@interfaces/interfaces';
import Utils from '@model/utils.class';

export default class Resource {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public credits: number | null = null
  ) {}

  fromInterface(r: ResourceInterface): Resource {
    this.id = r.id;
    this.name = Utils.urldecode(r.name);
    this.credits = r.credits;

    return this;
  }

  toInterface(): ResourceInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      credits: this.credits,
    };
  }
}

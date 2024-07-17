import { ShopResourceInterface } from '@interfaces/interfaces';
import Resource from '@model/resource.model';

export default class ShopResource {
  constructor(
    public resource: Resource | null = null,
    public value: number | null = null
  ) {}

  fromInterface(sr: ShopResourceInterface): ShopResource {
    this.resource =
      sr.resource !== null ? new Resource().fromInterface(sr.resource) : null;
    this.value = sr.value;

    return this;
  }

  toInterface(): ShopResourceInterface {
    return {
      resource: this.resource !== null ? this.resource.toInterface() : null,
      value: this.value,
    };
  }
}

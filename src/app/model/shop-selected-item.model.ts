import { ShopSelectedItemInterface } from '@interfaces/interfaces';
import Module from '@model/module.model';
import Resource from '@model/resource.model';
import Ship from '@model/ship.model';
import { urldecode, urlencode } from '@osumi/tools';

export default class ShopSelectedItem {
  constructor(
    public id: number | null = null,
    public type: number | null = null,
    public name: string | null = null,
    public num: number | null = null,
    public max: number | null = null,
    public price: number | null = null,
    public credits: number | null = null,
    public ship: Ship | null = null,
    public module: Module | null = null,
    public resource: Resource | null = null
  ) {}

  fromInterface(ssi: ShopSelectedItemInterface): ShopSelectedItem {
    this.id = ssi.id;
    this.type = ssi.type;
    this.name = urldecode(ssi.name);
    this.num = ssi.num;
    this.max = ssi.max;
    this.price = ssi.price;
    this.credits = ssi.credits;
    this.ship = ssi.ship !== null ? new Ship().fromInterface(ssi.ship) : null;
    this.module =
      ssi.module !== null ? new Module().fromInterface(ssi.module) : null;
    this.resource =
      ssi.resource !== null ? new Resource().fromInterface(ssi.resource) : null;

    return this;
  }

  toInterface(): ShopSelectedItemInterface {
    return {
      id: this.id,
      type: this.type,
      name: urlencode(this.name),
      num: this.num,
      max: this.max,
      price: this.price,
      credits: this.credits,
      ship: this.ship !== null ? this.ship.toInterface() : null,
      module: this.module !== null ? this.module.toInterface() : null,
      resource: this.resource !== null ? this.resource.toInterface() : null,
    };
  }
}

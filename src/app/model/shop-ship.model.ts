import { ShopShipInterface } from '@interfaces/interfaces';
import Ship from '@model/ship.model';

export default class ShopShip {
  constructor(
    public ship: Ship | null = null,
    public value: number | null = null
  ) {}

  fromInterface(ss: ShopShipInterface): ShopShip {
    this.ship = ss.ship !== null ? new Ship().fromInterface(ss.ship) : null;
    this.value = ss.value;

    return this;
  }

  toInterface(): ShopShipInterface {
    return {
      ship: this.ship !== null ? this.ship.toInterface() : null,
      value: this.value,
    };
  }
}

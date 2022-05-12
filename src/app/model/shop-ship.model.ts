import { ShopShipInterface } from 'src/app/interfaces/interfaces';
import { Ship } from 'src/app/model/ship.model';

export class ShopShip {
	constructor(
		public ship: Ship = null,
		public value: number = null
	) {}

	fromInterface(ss: ShopShipInterface): ShopShip {
		this.ship = new Ship().fromInterface(ss.ship);
		this.value = ss.value;

		return this;
	}

	toInterface(): ShopShipInterface {
		return {
			ship: this.ship.toInterface(),
			value: this.value
		};
	}
}
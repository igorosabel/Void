import { ShopSelectedItemInterface } from 'src/app/interfaces/interfaces';
import { Ship } from 'src/app/model/ship.model';
import { Module } from 'src/app/model/module.model';
import { Resource } from 'src/app/model/resource.model';
import { Utils } from 'src/app/model/utils.class';

export class ShopSelectedItem {
	constructor(
		public id: number = null,
		public type: number = null,
		public name: string = null,
		public num: number = null,
		public max: number = null,
		public price: number = null,
		public credits: number = null,
		public ship: Ship = null,
		public module: Module = null,
		public resource: Resource = null
	) {}

	fromInterface(ssi: ShopSelectedItemInterface): ShopSelectedItem {
		this.id = ssi.id;
		this.type = ssi.type;
		this.name = Utils.urldecode(ssi.name);
		this.num = ssi.num;
		this.max = ssi.max;
		this.price = ssi.price;
		this.credits = ssi.credits;
		this.ship = new Ship().fromInterface(ssi.ship);
		this.module = new Module().fromInterface(ssi.module);
		this.resource = new Resource().fromInterface(ssi.resource);

		return this;
	}

	toInterface(): ShopSelectedItemInterface {
		return {
			id: this.id,
			type: this.type,
			name: Utils.urlencode(this.name),
			num: this.num,
			max: this.max,
			price: this.price,
			credits: this.credits,
			ship: this.ship.toInterface(),
			module: this.module.toInterface(),
			resource: this.resource.toInterface()
		};
	}
}
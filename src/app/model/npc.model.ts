import { NPCInterface } from 'src/app/interfaces/interfaces';
import { ShopShip } from 'src/app/model/shop-ship.model';
import { ShopModule } from 'src/app/model/shop-module.model';
import { ShopResource } from 'src/app/model/shop-resource.model';
import { Utils } from 'src/app/model/utils.class';

export class NPC {
	constructor(
		public id: number = null,
		public name: string = null,
		public idRace: number = null,
		public ships: ShopShip[] = [],
		public modules: ShopModule[] = [],
		public resources: ShopResource[] = []
	) {}

	fromInterface(n: NPCInterface): NPC {
		this.id = n.id;
		this.name = Utils.urldecode(n.name);
		this.idRace = n.idRace;
		this.ships = n.ships.map((item) => { return new ShopShip().fromInterface(item); });
		this.modules = n.modules.map((item) => { return new ShopModule().fromInterface(item); });
		this.resources = n.resources.map((item) => { return new ShopResource().fromInterface(item); });

		return this;
	}

	toInterface(): NPCInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			idRace: this.idRace,
			ships: this.ships.map((item) => { return item.toInterface(); }),
			modules: this.modules.map((item) => { return item.toInterface(); }),
			resources: this.resources.map((item) => { return item.toInterface(); })
		};
	}
}
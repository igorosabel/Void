import { SystemPlanetInterface } from 'src/app/interfaces/interfaces';
import { SystemResource } from 'src/app/model/system-resource.model';
import { SystemMoon } from 'src/app/model/system-moon.model';
import { Utils } from 'src/app/model/utils.class';

export class SystemPlanet {
	constructor(
		public id: number = null,
		public name: string = null,
		public type: string = null,
		public typeLink: string = null,
		public typeDesc: string = null,
		public distance: number = null,
		public radius: number = null,
		public rotation: number = null,
		public explored: boolean = null,
		public exploreTime: number = null,
		public resources: SystemResource[] = [],
		public moons: SystemMoon[] = []
	) {}

	fromInterface(sp: SystemPlanetInterface): SystemPlanet {
		this.id = sp.id;
		this.name = Utils.urldecode(sp.name);
		this.type = Utils.urldecode(sp.type);
		this.typeLink = Utils.urldecode(sp.typeLink);
		this.typeDesc = Utils.urldecode(sp.typeDesc);
		this.distance = sp.distance;
		this.radius = sp.radius;
		this.rotation = sp.rotation;
		this.explored = sp.explored;
		this.exploreTime = sp.exploreTime;
		this.resources = sp.resources.map((item) => { return new SystemResource().fromInterface(item); });
		this.moons = sp.moons.map((item) => { return new SystemMoon().fromInterface(item); });

		return this;
	}

	toInterface(): SystemPlanetInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			type: Utils.urlencode(this.type),
			typeLink: Utils.urlencode(this.typeLink),
			typeDesc: Utils.urlencode(this.typeDesc),
			distance: this.distance,
			radius: this.radius,
			rotation: this.rotation,
			explored: this.explored,
			exploreTime: this.exploreTime,
			resources: this.resources.map((item) => { return item.toInterface(); }),
			moons: this.moons.map((item) => { return item.toInterface(); })
		};
	}
}
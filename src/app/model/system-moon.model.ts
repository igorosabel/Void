import { SystemMoonInterface } from 'src/app/interfaces/interfaces';
import { SystemResource } from 'src/app/model/system-resource.model';
import { Utils } from 'src/app/model/utils.class';

export class SystemMoon {
	constructor(
		public id: number = null,
		public name: string = '',
		public type: number = null,
		public distance: number = null,
		public radius: number = null,
		public rotation: number = null,
		public explored: boolean = false,
		public exploreTime: number = null,
		public resources: SystemResource[] = []
	) {}

	fromInterface(sm: SystemMoonInterface): SystemMoon {
		this.id = sm.id;
		this.name = Utils.urldecode(sm.name);
		this.type = sm.type;
		this.distance = sm.distance;
		this.radius = sm.radius;
		this.rotation = sm.rotation;
		this.explored = sm.explored;
		this.exploreTime = sm.exploreTime;
		this.resources = sm.resources.map((item) => { return new SystemResource().fromInterface(item); });

		return this;
	}

	toInterface(): SystemMoonInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			type: this.type,
			distance: this.distance,
			radius: this.radius,
			rotation: this.rotation,
			explored: this.explored,
			exploreTime: this.exploreTime,
			resources: this.resources.map((item) => { return item.toInterface(); })
		};
	}
}

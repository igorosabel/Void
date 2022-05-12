import { SystemConnectionInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class SystemConnection {
	constructor(
		public idSystemEnd: number = null,
		public order: number = null,
		public navigateTime: number = null,
		public name: string = null
	) {}

	fromInterface(sc: SystemConnectionInterface): SystemConnection {
		this.idSystemEnd = sc.idSystemEnd;
		this.order = sc.order;
		this.navigateTime = sc.navigateTime;
		this.name = Utils.urldecode(sc.name);

		return this;
	}

	toInterface(): SystemConnectionInterface {
		return {
			idSystemEnd: this.idSystemEnd,
			order: this.order,
			navigateTime: this.navigateTime,
			name: Utils.urlencode(this.name)
		};
	}
}
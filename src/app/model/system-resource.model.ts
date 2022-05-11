import { SystemResourceInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class SystemResource {
	constructor(
		public id: number = null,
		public name: string = null,
		public value: number = null,
	) {}

	fromInterface(sr: SystemResourceInterface): SystemResource {
		this.id = sr.id;
		this.name = Utils.urldecode(sr.name);
		this.value = sr.value;

		return this;
	}

	toInterface(): SystemResourceInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			value: this.value
		};
	}
}

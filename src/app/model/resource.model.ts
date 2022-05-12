import { ResourceInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class Resource {
	constructor(
		public id: number = null,
		public name: string = null,
		public credits: number = null
	) {}

	fromInterface(r: ResourceInterface): Resource {
		this.id = r.id;
		this.name = Utils.urldecode(r.name);
		this.credits = r.credits;

		return this;
	}

	toInterface(): ResourceInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			credits: this.credits
		};
	}
}
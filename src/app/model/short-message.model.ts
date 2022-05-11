import { ShortMessageInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class ShortMessage {
	constructor(
		public id: number = null,
		public type: number = null,
		public name: string = null,
		public date: string = null,
		public message: string = null
	) {}

	fromInterface(sm: ShortMessageInterface): ShortMessage {
		this.id = sm.id;
		this.type = sm.type;
		this.name = Utils.urldecode(sm.name);
		this.date = Utils.urldecode(sm.date);
		this.message = Utils.urldecode(sm.message);

		return this;
	}

	toInterface(): ShortMessageInterface {
		return {
			id: this.id,
			type: this.type,
			name: Utils.urlencode(this.name),
			date: Utils.urlencode(this.date),
			message: Utils.urlencode(this.message)
		};
	}
}

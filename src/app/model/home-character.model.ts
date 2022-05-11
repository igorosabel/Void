import { HomeCharacterInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class HomeCharacter {
	constructor(
		public id: number = null,
		public type: number = null,
		public name: string = null
	) {}

	fromInterface(hc: HomeCharacterInterface): HomeCharacter {
		this.id = hc.id;
		this.type = hc.type;
		this.name = Utils.urldecode(hc.name);

		return this;
	}

	toInterface(): HomeCharacterInterface {
		return {
			id: this.id,
			type: this.type,
			name: Utils.urlencode(this.name)
		};
	}
}

import { CurrentSystemInterface } from 'src/app/interfaces/interfaces';
import { ShortMessage } from 'src/app/model/short-message.model';
import { HomeCharacter } from 'src/app/model/home-character.model';
import { Utils } from 'src/app/model/utils.class';

export class CurrentSystem {
	constructor(
		public system: string = '',
		public star: string = '',
		public numPlanets: number = 0,
		public credits: number = 0,
		public maxStrength: number = 0,
		public strength: number = 0,
		public messages: ShortMessage[] = [],
		public characters: HomeCharacter[] = []
	) {}

	fromInterface(cs: CurrentSystemInterface): CurrentSystem {
		this.system = Utils.urldecode(cs.system);
		this.star = Utils.urldecode(cs.star);
		this.numPlanets = cs.numPlanets;
		this.credits = cs.credits;
		this.maxStrength = cs.maxStrength;
		this.strength = cs.strength;
		this.messages = cs.messages.map((item) => { return new ShortMessage().fromInterface(item); });
		this.characters = cs.characters.map((item) => { return new HomeCharacter().fromInterface(item) });

		return this;
	}

	toInterface(): CurrentSystemInterface {
		return {
			system: Utils.urlencode(this.system),
			star: Utils.urlencode(this.star),
			numPlanets: this.numPlanets,
			credits: this.credits,
			maxStrength: this.maxStrength,
			strength: this.strength,
			messages: this.messages.map((item) => { return item.toInterface(); }),
			characters: this.characters.map((item) => { return item.toInterface(); })
		};
	}
}

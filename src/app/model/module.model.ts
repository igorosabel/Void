import { ModuleInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class Module {
	constructor(
		public id: number = null,
		public name: string = null,
		public idType: number = null,
		public engine: number = null,
		public shield: number = null,
		public cargo: number = null,
		public damage: number = null,
		public crew: number = null,
		public energy: number = null,
		public slots: number = null,
		public credits: number = null
	) {}

	fromInterface(m: ModuleInterface): Module {
		this.id = m.id;
		this.name = Utils.urldecode(m.name);
		this.idType = m.idType;
		this.engine = m.engine;
		this.shield = m.shield;
		this.cargo = m.cargo;
		this.damage = m.damage;
		this.crew = m.crew;
		this.energy = m.energy;
		this.slots = m.slots;
		this.credits = m.credits;

		return this;
	}

	toInterface(): ModuleInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			idType: this.idType,
			engine: this.engine,
			shield: this.shield,
			cargo: this.cargo,
			damage: this.damage,
			crew: this.crew,
			energy: this.energy,
			slots: this.slots,
			credits: this.credits
		};
	}
}
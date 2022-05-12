import { ShipInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class Ship {
	constructor(
		public id: number = null,
		public name: string = null,
		public idType: number = null,
		public maxStrength: number = null,
		public strength: number = null,
		public endurance: number = null,
		public shield: number = null,
		public idEngine: number = null,
		public speed: number = null,
		public maxCargo: number = null,
		public cargo: number = null,
		public damage: number = null,
		public idGenerator: number = null,
		public maxEnergy: number = null,
		public energy: number = null,
		public slots: number = null,
		public crew: number = null,
		public credits: number = null
	) {}

	fromInterface(s: ShipInterface): Ship {
		this.id = s.id;
		this.name = Utils.urldecode(s.name);
		this.idType = s.idType;
		this.maxStrength = s.maxStrength;
		this.strength = s.strength;
		this.endurance = s.endurance;
		this.shield = s.shield;
		this.idEngine = s.idEngine;
		this.speed = s.speed;
		this.maxCargo = s.maxCargo;
		this.cargo = s.cargo;
		this.damage = s.damage;
		this.idGenerator = s.idGenerator;
		this.maxEnergy = s.maxEnergy;
		this.energy = s.energy;
		this.slots = s.slots;
		this.crew = s.crew;
		this.credits = s.credits;

		return this;
	}

	toInterface(): ShipInterface {
		return {
			id: this.id,
			name: Utils.urlencode(this.name),
			idType: this.idType,
			maxStrength: this.maxStrength,
			strength: this.strength,
			endurance: this.endurance,
			shield: this.shield,
			idEngine: this.idEngine,
			speed: this.speed,
			maxCargo: this.maxCargo,
			cargo: this.cargo,
			damage: this.damage,
			idGenerator: this.idGenerator,
			maxEnergy: this.maxEnergy,
			energy: this.energy,
			slots: this.slots,
			crew: this.crew,
			credits: this.credits
		};
	}
}
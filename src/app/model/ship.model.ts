import { ShipInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Ship {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public idType: number | null = null,
    public maxStrength: number | null = null,
    public strength: number | null = null,
    public endurance: number | null = null,
    public shield: number | null = null,
    public idEngine: number | null = null,
    public speed: number | null = null,
    public maxCargo: number | null = null,
    public cargo: number | null = null,
    public damage: number | null = null,
    public idGenerator: number | null = null,
    public maxEnergy: number | null = null,
    public energy: number | null = null,
    public slots: number | null = null,
    public crew: number | null = null,
    public credits: number | null = null
  ) {}

  fromInterface(s: ShipInterface): Ship {
    this.id = s.id;
    this.name = urldecode(s.name);
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
      name: urlencode(this.name),
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
      credits: this.credits,
    };
  }
}

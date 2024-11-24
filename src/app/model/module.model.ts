import { ModuleInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class Module {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public idType: number | null = null,
    public engine: number | null = null,
    public shield: number | null = null,
    public cargo: number | null = null,
    public damage: number | null = null,
    public crew: number | null = null,
    public energy: number | null = null,
    public slots: number | null = null,
    public credits: number | null = null
  ) {}

  fromInterface(m: ModuleInterface): Module {
    this.id = m.id;
    this.name = urldecode(m.name);
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
      name: urlencode(this.name),
      idType: this.idType,
      engine: this.engine,
      shield: this.shield,
      cargo: this.cargo,
      damage: this.damage,
      crew: this.crew,
      energy: this.energy,
      slots: this.slots,
      credits: this.credits,
    };
  }
}

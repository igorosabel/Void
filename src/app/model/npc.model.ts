import { NPCInterface } from '@interfaces/interfaces';
import ShopModule from '@model/shop-module.model';
import ShopResource from '@model/shop-resource.model';
import ShopShip from '@model/shop-ship.model';
import { urldecode, urlencode } from '@osumi/tools';

export default class NPC {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public idRace: number | null = null,
    public ships: ShopShip[] = [],
    public modules: ShopModule[] = [],
    public resources: ShopResource[] = []
  ) {}

  fromInterface(n: NPCInterface): NPC {
    this.id = n.id;
    this.name = urldecode(n.name);
    this.idRace = n.idRace;
    this.ships = n.ships.map((item) => {
      return new ShopShip().fromInterface(item);
    });
    this.modules = n.modules.map((item) => {
      return new ShopModule().fromInterface(item);
    });
    this.resources = n.resources.map((item) => {
      return new ShopResource().fromInterface(item);
    });

    return this;
  }

  toInterface(): NPCInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      idRace: this.idRace,
      ships: this.ships.map((item) => {
        return item.toInterface();
      }),
      modules: this.modules.map((item) => {
        return item.toInterface();
      }),
      resources: this.resources.map((item) => {
        return item.toInterface();
      }),
    };
  }
}

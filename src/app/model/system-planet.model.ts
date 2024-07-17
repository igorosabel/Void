import {
  SystemMoonInterface,
  SystemPlanetInterface,
  SystemResourceInterface,
} from '@interfaces/interfaces';
import SystemMoon from '@model/system-moon.model';
import SystemResource from '@model/system-resource.model';
import Utils from '@model/utils.class';

export default class SystemPlanet {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public type: string | null = null,
    public typeLink: string | null = null,
    public typeDesc: string | null = null,
    public distance: number | null = null,
    public radius: number | null = null,
    public rotation: number | null = null,
    public explored: boolean = false,
    public exploreTime: number | null = null,
    public resources: SystemResource[] = [],
    public moons: SystemMoon[] = []
  ) {}

  fromInterface(sp: SystemPlanetInterface): SystemPlanet {
    this.id = sp.id;
    this.name = Utils.urldecode(sp.name);
    this.type = Utils.urldecode(sp.type);
    this.typeLink = Utils.urldecode(sp.typeLink);
    this.typeDesc = Utils.urldecode(sp.typeDesc);
    this.distance = sp.distance;
    this.radius = sp.radius;
    this.rotation = sp.rotation;
    this.explored = sp.explored;
    this.exploreTime = sp.exploreTime;
    this.resources = sp.resources.map(
      (item: SystemResourceInterface): SystemResource => {
        return new SystemResource().fromInterface(item);
      }
    );
    this.moons = sp.moons.map((item: SystemMoonInterface): SystemMoon => {
      return new SystemMoon().fromInterface(item);
    });

    return this;
  }

  toInterface(): SystemPlanetInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      type: Utils.urlencode(this.type),
      typeLink: Utils.urlencode(this.typeLink),
      typeDesc: Utils.urlencode(this.typeDesc),
      distance: this.distance,
      radius: this.radius,
      rotation: this.rotation,
      explored: this.explored,
      exploreTime: this.exploreTime,
      resources: this.resources.map(
        (item: SystemResource): SystemResourceInterface => {
          return item.toInterface();
        }
      ),
      moons: this.moons.map((item: SystemMoon): SystemMoonInterface => {
        return item.toInterface();
      }),
    };
  }
}

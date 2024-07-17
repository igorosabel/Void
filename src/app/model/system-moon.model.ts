import {
  SystemMoonInterface,
  SystemResourceInterface,
} from '@interfaces/interfaces';
import SystemResource from '@model/system-resource.model';
import Utils from '@model/utils.class';

export default class SystemMoon {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public type: number | null = null,
    public distance: number | null = null,
    public radius: number | null = null,
    public rotation: number | null = null,
    public explored: boolean = false,
    public exploreTime: number | null = null,
    public resources: SystemResource[] = []
  ) {}

  fromInterface(sm: SystemMoonInterface): SystemMoon {
    this.id = sm.id;
    this.name = Utils.urldecode(sm.name);
    this.type = sm.type;
    this.distance = sm.distance;
    this.radius = sm.radius;
    this.rotation = sm.rotation;
    this.explored = sm.explored;
    this.exploreTime = sm.exploreTime;
    this.resources = sm.resources.map(
      (item: SystemResourceInterface): SystemResource => {
        return new SystemResource().fromInterface(item);
      }
    );

    return this;
  }

  toInterface(): SystemMoonInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      type: this.type,
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
    };
  }
}

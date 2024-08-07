import { SystemInfoInterface } from '@interfaces/interfaces';
import SystemPlanet from '@model/system-planet.model';
import Utils from '@model/utils.class';

export default class SystemInfo {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public type: string | null = null,
    public typeLink: string | null = null,
    public typeDesc: string | null = null,
    public typeColor: string | null = null,
    public idDiscoverer: number | null = null,
    public discoverer: string | null = null,
    public radius: number | null = null,
    public numNPC: number | null = null,
    public fullyExplored: boolean = false,
    public planets: SystemPlanet[] = []
  ) {}

  fromInterface(si: SystemInfoInterface): SystemInfo {
    this.id = si.id;
    this.name = Utils.urldecode(si.name);
    this.type = Utils.urldecode(si.type);
    this.typeLink = Utils.urldecode(si.typeLink);
    this.typeDesc = Utils.urldecode(si.typeDesc);
    this.typeColor = Utils.urldecode(si.typeColor);
    this.idDiscoverer = si.idDiscoverer;
    this.discoverer = Utils.urldecode(si.discoverer);
    this.radius = si.radius;
    this.numNPC = si.numNPC;
    this.fullyExplored = si.fullyExplored;
    this.planets = si.planets.map((item) => {
      return new SystemPlanet().fromInterface(item);
    });

    return this;
  }

  toInterface(): SystemInfoInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      type: Utils.urlencode(this.type),
      typeLink: Utils.urlencode(this.typeLink),
      typeDesc: Utils.urlencode(this.typeDesc),
      typeColor: Utils.urlencode(this.typeColor),
      idDiscoverer: this.idDiscoverer,
      discoverer: Utils.urlencode(this.discoverer),
      radius: this.radius,
      numNPC: this.numNPC,
      fullyExplored: this.fullyExplored,
      planets: this.planets.map((item) => {
        return item.toInterface();
      }),
    };
  }
}

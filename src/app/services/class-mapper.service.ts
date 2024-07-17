import { Injectable } from '@angular/core';
import {
  ModuleInterface,
  ShipInterface,
  ShopResourceInterface,
} from '@interfaces/interfaces';
import Module from '@model/module.model';
import Ship from '@model/ship.model';
import ShopResource from '@model/shop-resource.model';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
  getShip(s: ShipInterface): Ship {
    return new Ship().fromInterface(s);
  }

  getShips(ss: ShipInterface[]): Ship[] {
    return ss.map((s: ShipInterface): Ship => {
      return this.getShip(s);
    });
  }

  getModule(m: ModuleInterface): Module {
    return new Module().fromInterface(m);
  }

  getModules(ms: ModuleInterface[]): Module[] {
    return ms.map((m: ModuleInterface): Module => {
      return this.getModule(m);
    });
  }

  getShopResource(sr: ShopResourceInterface): ShopResource {
    return new ShopResource().fromInterface(sr);
  }

  getShopResources(srs: ShopResourceInterface[]): ShopResource[] {
    return srs.map((sr: ShopResourceInterface): ShopResource => {
      return this.getShopResource(sr);
    });
  }
}

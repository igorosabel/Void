import { ShopModuleInterface } from '@interfaces/interfaces';
import Module from '@model/module.model';

export default class ShopModule {
  constructor(
    public module: Module | null = null,
    public value: number | null = null
  ) {}

  fromInterface(sm: ShopModuleInterface): ShopModule {
    this.module =
      sm.module !== null ? new Module().fromInterface(sm.module) : null;
    this.value = sm.value;

    return this;
  }

  toInterface(): ShopModuleInterface {
    return {
      module: this.module !== null ? this.module.toInterface() : null,
      value: this.value,
    };
  }
}

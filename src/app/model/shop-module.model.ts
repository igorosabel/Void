import { ShopModuleInterface } from 'src/app/interfaces/interfaces';
import { Module } from 'src/app/model/module.model';

export class ShopModule {
	constructor(
		public module: Module = null,
		public value: number = null
	) {}

	fromInterface(sm: ShopModuleInterface): ShopModule {
		this.module = new Module().fromInterface(sm.module);
		this.value = sm.value;

		return this;
	}

	toInterface(): ShopModuleInterface {
		return {
			module: this.module.toInterface(),
			value: this.value
		};
	}
}
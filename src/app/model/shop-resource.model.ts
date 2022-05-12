import { ShopResourceInterface } from 'src/app/interfaces/interfaces';
import { Resource } from 'src/app/model/resource.model';

export class ShopResource {
	constructor(
		public resource: Resource = null,
		public value: number = null
	) {}

	fromInterface(sr: ShopResourceInterface): ShopResource {
		this.resource = new Resource().fromInterface(sr.resource);
		this.value = sr.value;

		return this;
	}

	toInterface(): ShopResourceInterface {
		return {
			resource: this.resource.toInterface(),
			value: this.value
		};
	}
}
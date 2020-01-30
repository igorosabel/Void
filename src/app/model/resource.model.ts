import { Random } from '../shared/random.class';

export class Resource {
	constructor(
		public id: number = null,
		public name: string = null,
		public minPrice: number = null,
		public maxPrice: number = null,
		public value: number = null,
		public idNPC: number = null,
		public credits: number = null
	){
		this.credits = this.getCredits();
	}
	
	getCredits() {
		const random = new Random(this.idNPC);
		let credits = random.nextInt32([this.minPrice,this.maxPrice]);
		
		credits = Math.floor(credits / 10) * 10;
		
		return credits;
	}
}
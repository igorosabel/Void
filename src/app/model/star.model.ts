import { StarInterface } from 'src/app/interfaces/interfaces';

export class Star {
	constructor(
		public top: number =  0,
		public right: number = 0,
		public width: number = 0,
		public pulse: number = 0
	) {}
}

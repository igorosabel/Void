import { Injectable } from '@angular/core';
import { CurrentSystem } from 'src/app/model/current-system.model';
import { CurrentSystemInterface } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getCurrentSystem(cs: CurrentSystemInterface): CurrentSystem {
		return new CurrentSystem().fromInterface(cs);
	}
}

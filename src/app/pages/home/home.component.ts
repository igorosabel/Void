import { Component, OnInit } from '@angular/core';
import { CurrentSystem } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';

@Component({
	selector: 'void-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	system: CurrentSystem = {
		system: '',
		star: '',
		numPlanets: 0,
		credits: 0,
		maxStrength: 0,
		strength: 0,
		messages: [],
		characters: []
	}

	constructor(private as: ApiService) {}
	ngOnInit() {
		this.as.getCurrentSystem().subscribe(response => {
			if (response.status=='ok') {
				this.system = response.system;
			}
		});
	}
}
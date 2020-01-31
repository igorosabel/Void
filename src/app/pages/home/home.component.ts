import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentSystem } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { HomeShopComponent } from '../../components/home-shop/home-shop.component';

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
	};
	@ViewChild('shop', { static: true }) shop: HomeShopComponent;

	constructor(private as: ApiService) {}
	ngOnInit() {
		this.as.getCurrentSystem().subscribe(response => {
			if (response.status=='ok') {
				this.system = response.system;
			}
		});
	}

	openShop(id: number) {
		this.shop.loadShop(id);
	}
	
	buy(credits) {
		console.log(credits);
		this.system.credits = credits;
	}
}
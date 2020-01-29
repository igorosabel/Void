import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NPC } from '../../interfaces/interfaces';

@Component({
	selector: 'void-home-shop',
	templateUrl: './home-shop.component.html',
	styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent implements OnInit {
	show: boolean = false;
	loaded: boolean = false;
	npc: NPC = {
		id: null,
		name: null,
		idRace: null,
		ships: [],
		modules: [],
		resources: []
	};

	constructor(private as: ApiService) {}
	ngOnInit() {}

	loadShop(id: number) {
		this.show = true;
		this.as.getNPCShop(id).subscribe(result => {
			this.npc = result.npc;
			this.loaded = true;
		});
	}
	
	closeShop() {
		this.show = false;
		this.loaded = false;
	}
}
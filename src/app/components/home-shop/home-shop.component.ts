import { Component, OnInit } from '@angular/core';
import { MatIconRegistry }   from "@angular/material/icon";
import { DomSanitizer }      from "@angular/platform-browser";
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

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private as: ApiService) {
		this.matIconRegistry.addSvgIcon(
			"void-ship",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ship.svg")
		);
	}
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
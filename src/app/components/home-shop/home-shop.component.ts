import { Component, OnInit }  from '@angular/core';
import { MatIconRegistry }    from "@angular/material/icon";
import { DomSanitizer }       from "@angular/platform-browser";
import { ApiService }         from '../../services/api.service';
import { ClassMapperService } from '../../services/class-mapper.service';
import { NPC, NPCShip, NPCModule } from '../../interfaces/interfaces';
import { Resource }           from '../../model/resource.model';

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
	resources: Resource[] = [];
	selectedItem = {
		name: '',
		num: null,
		max: null,
		credits: null
	};

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private as: ApiService, private cs: ClassMapperService) {
		this.matIconRegistry.addSvgIcon(
			"void-ship",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ship.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-1",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_1.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-2",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_2.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-3",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_3.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-4",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_4.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-5",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_5.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-6",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_6.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-7",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_7.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-8",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_8.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-9",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_9.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-10",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_10.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-11",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_11.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-12",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_12.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-13",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_13.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"void-resource-14",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/resources/resource_14.svg")
		);
	}
	ngOnInit() {}

	loadShop(id: number) {
		this.show = true;
		this.as.getNPCShop(id).subscribe(result => {
			this.npc = result.npc;
			this.resources = this.cs.getResources(this.npc.resources, this.npc.id);
			this.loaded = true;
		});
	}

	closeShop() {
		this.show = false;
		this.loaded = false;
	}

	selectShip(ship: NPCShip) {
		console.log(ship);
	}

	selectModule(module: NPCModule) {
		console.log(module);
	}

	selectResource(resource: Resource) {
		console.log(resource);
	}
}
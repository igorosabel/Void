import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer }    from '@angular/platform-browser';
import { ApiService }      from '../../services/api.service';
import { DialogService }   from '../../services/dialog.service';
import { NPC, NPCShip, NPCModule, NPCResource, ShopSelectedItem, BuyData } from '../../interfaces/interfaces';
import { MODULES, HULLS, ENGINES, GENERATORS } from '../../shared/constants';

@Component({
	selector: 'void-home-shop',
	templateUrl: './home-shop.component.html',
	styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent implements OnInit {
	show: boolean = false;
	loaded: boolean = false;
	buying: boolean = false;
	shopTab: string = 'buy';
	@Input() credits : number = 0;
	@Output() buyEvent = new EventEmitter<number>();
	npc: NPC = {
		id: null,
		name: null,
		idRace: null,
		ships: [],
		modules: [],
		resources: []
	};
	shopStep: number = 1;
	selectedItem: ShopSelectedItem = {
		id: null,
		type: null,
		name: null,
		num: null,
		max: null,
		price: null,
		credits: null,
		ship: null,
		module: null,
		resource: null
	};
	private shopNum: ElementRef;
	@ViewChild('shopNum', { static: true }) set content(content: ElementRef) {
		this.shopNum = content;
	}
	moduleTypes: any    = [];
	hullTypes: any      = [];
	engineTypes: any    = [];
	generatorTypes: any = [];

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private as: ApiService, private dialog: DialogService) {
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
		this.moduleTypes    = MODULES;
		this.hullTypes      = HULLS;
		this.engineTypes    = ENGINES;
		this.generatorTypes = GENERATORS;
	}
	ngOnInit() {}

	loadShop(id: number) {
		this.show = true;
		this.as.getNPCShop(id).subscribe(result => {
			this.shopTab = 'buy';
			this.shopStep = 1;
			this.npc = result.npc;
			this.loaded = true;
			this.buying = false;
			this.selectedItem = {
				id: null,
				type: null,
				name: null,
				num: null,
				max: null,
				price: null,
				credits: null,
				ship: null,
				module: null,
				resource: null
			};
		});
	}

	closeShop() {
		this.show = false;
		this.loaded = false;
	}
	
	selectTab(tab, ev) {
		ev.preventDefault();
		this.shopTab = tab;
	}

	selectShip(ship: NPCShip) {
		this.selectedItem.id = ship.ship.id;
		this.selectedItem.type = 1;
		this.selectedItem.name = ship.ship.name;
		this.selectedItem.num = 1;
		this.selectedItem.max = ship.value;
		this.selectedItem.price = ship.ship.credits;
		this.selectedItem.credits = ship.ship.credits;
		this.selectedItem.ship = ship.ship;
		this.shopStep = 2;
	}

	selectModule(module: NPCModule) {
		this.selectedItem.id = module.module.id;
		this.selectedItem.type = 2;
		this.selectedItem.name = module.module.name;
		this.selectedItem.num = 1;
		this.selectedItem.max = module.value;
		this.selectedItem.price = module.module.credits;
		this.selectedItem.credits = module.module.credits;
		this.selectedItem.module = module.module;
		this.shopStep = 2;
	}

	selectResource(resource: NPCResource) {
		this.selectedItem.id = resource.resource.id;
		this.selectedItem.type = 3;
		this.selectedItem.name = resource.resource.name;
		this.selectedItem.num = 1;
		this.selectedItem.max = resource.value;
		this.selectedItem.price = resource.resource.credits;
		this.selectedItem.credits = resource.resource.credits;
		this.selectedItem.resource = resource.resource;
		this.shopStep = 2;
	}
	
	backToStepOne() {
		this.shopStep = 1;
	}
	
	updateSelectedItemCredits() {
		if (this.selectedItem.num > this.selectedItem.max) {
			this.selectedItem.num = this.selectedItem.max;
			this.shopNum.nativeElement.value = this.selectedItem.num;
		}
		this.selectedItem.credits = this.selectedItem.price * this.selectedItem.num;
	}
	
	buy() {
		this.buying = true;
		const params: BuyData = {
			idNPC: this.npc.id,
			id: this.selectedItem.id,
			type: this.selectedItem.type,
			num: this.selectedItem.num
		};
		this.as.buy(params).subscribe(result => {
			if (result.status=='ok') {
				switch (this.selectedItem.type) {
					case 1: {
						const shipIndex = this.npc.ships.findIndex(x => x.ship.id==this.selectedItem.id);
						this.npc.ships[shipIndex].value--;
					}
					break;
					case 2: {
						const moduleIndex = this.npc.modules.findIndex(x => x.module.id==this.selectedItem.id);
						this.npc.modules[moduleIndex].value--;
					}
					break;
					case 3: {
						const resourceIndex = this.npc.resources.findIndex(x => x.resource.id==this.selectedItem.id);
						this.npc.resources[resourceIndex].value--;
					}
					break;
				}
				this.selectedItem.max--;
				this.credits -= this.selectedItem.credits;
				
				this.buyEvent.emit(this.credits);
				this.shopStep = 3;
			}
			else{
				this.dialog.alert({title: 'Error', content: '¡Ocurrió un error al confirmar la compra! Vuelve a intentarlo de nuevo, por favor.', ok: 'Continuar'}).subscribe(result => {});
			}
		});
	}
}
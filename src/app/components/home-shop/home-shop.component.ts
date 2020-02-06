import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer }    from '@angular/platform-browser';
import { ApiService }      from '../../services/api.service';
import { DialogService }   from '../../services/dialog.service';
import { NPC, ShopShip, Ship, ShopModule, Module, ShopResource, ShopSelectedItem, ShopData, SellItemsStatus } from '../../interfaces/interfaces';
import { MODULES, HULLS, ENGINES, GENERATORS } from '../../shared/constants';

@Component({
	selector: 'void-home-shop',
	templateUrl: './home-shop.component.html',
	styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent implements OnInit {
	idNPC: number;
	show: boolean = false;
	loaded: boolean = false;
	buying: boolean = false;
	selling: boolean = false;
	shopTab: string = 'buy';
	@Input() credits : number = 0;
	@Output() buySellEvent = new EventEmitter<number>();
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
	playerSelling: SellItemsStatus = {
		status: null,
		ships: [],
		modules: [],
		resources: []
	};
	sellStep: number = 1;

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
		this.idNPC = id;
		this.shopTab = 'buy';
		this.shopStep = 1;
		this.sellStep = 1;
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
		this.loadNPC();
	}
	
	loadNPC() {
		this.as.getNPCShop(this.idNPC).subscribe(result => {
			this.npc = result.npc;
			this.loaded = true;
			
			this.as.getSellItems(this.npc.id).subscribe(result => {
				this.playerSelling = result;
			});
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

	selectShip(ship: ShopShip) {
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

	selectModule(module: ShopModule) {
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

	selectResource(resource: ShopResource) {
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
		console.log(this.selectedItem);
		if (this.selectedItem.num > this.selectedItem.max) {
			this.selectedItem.num = this.selectedItem.max;
			this.shopNum.nativeElement.value = this.selectedItem.num;
		}
		this.selectedItem.credits = this.selectedItem.price * this.selectedItem.num;
		console.log(this.selectedItem);
	}
	
	buy() {
		this.buying = true;
		const params: ShopData = {
			idNPC: this.npc.id,
			id: this.selectedItem.id,
			type: this.selectedItem.type,
			num: this.selectedItem.num
		};
		this.as.buy(params).subscribe(result => {
			this.buying = false;
			if (result.status=='ok') {
				this.loadNPC();
				this.credits -= this.selectedItem.credits;
				
				this.buySellEvent.emit(this.credits * -1);
				this.shopStep = 3;
			}
			else if (result.status=='no-room'){
				this.dialog.alert({title: 'Error', content: '¡No tienes suficiente espacio de almacenamiento en tu nave para comprar este recurso!', ok: 'Continuar'}).subscribe(result => {});
			}
			else{
				this.dialog.alert({title: 'Error', content: '¡Ocurrió un error al confirmar la compra! Vuelve a intentarlo de nuevo, por favor.', ok: 'Continuar'}).subscribe(result => {});
			}
		});
	}
	
	buyEnd() {
		this.shopStep = 1;
	}
	
	sellShip(ship: Ship) {
		this.selectedItem.id = ship.id;
		this.selectedItem.type = 1;
		this.selectedItem.name = ship.name;
		this.selectedItem.num = 1;
		this.selectedItem.max = 1;
		this.selectedItem.credits = ship.credits;
		this.selectedItem.ship = ship;
		this.sellStep = 2;
	}
	
	sellModule(module: Module) {
		this.selectedItem.id = module.id;
		this.selectedItem.type = 2;
		this.selectedItem.name = module.name;
		this.selectedItem.num = 1;
		this.selectedItem.max = 1;
		this.selectedItem.credits = module.credits;
		this.selectedItem.module = module;
		this.sellStep = 2;
	}
	
	sellResource(resource: ShopResource) {
		this.selectedItem.id = resource.resource.id;
		this.selectedItem.type = 3;
		this.selectedItem.name = resource.resource.name;
		this.selectedItem.num = 1;
		this.selectedItem.max = resource.value;
		this.selectedItem.price = resource.resource.credits;
		this.selectedItem.credits = resource.resource.credits;
		this.selectedItem.resource = resource.resource;
		this.sellStep = 2;
	}
	
	backToSellStepOne() {
		this.sellStep = 1;
	}
	
	sell() {
		this.selling = true;
		const params: ShopData = {
			idNPC: this.npc.id,
			id: this.selectedItem.id,
			type: this.selectedItem.type,
			num: this.selectedItem.num
		};
		this.as.sell(params).subscribe(result => {
			this.selling = false;
			if (result.status=='ok') {
				this.loadNPC();
				this.credits += this.selectedItem.credits;
				
				this.buySellEvent.emit(this.credits);
				this.sellStep = 3;
			}
			else{
				this.dialog.alert({title: 'Error', content: '¡Ocurrió un error al confirmar la compra! Vuelve a intentarlo de nuevo, por favor.', ok: 'Continuar'}).subscribe(result => {});
			}
		});
	}
}
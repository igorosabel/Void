import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer }    from '@angular/platform-browser';
import { ApiService }      from '../../services/api.service';
import { CommonService }   from '../../services/common.service';
import { DialogService }   from '../../services/dialog.service';
import { StarSystemComponent } from '../../components/star-system/star-system.component';
import { SystemInfo, SystemConnection, EditNameData, StarSystemSelect } from '../../interfaces/interfaces';

@Component({
	selector: 'void-navigate',
	templateUrl: './navigate.component.html',
	styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {
	idPlayer: number = null;
	@ViewChild('starSystem', { static: true }) starSystem: StarSystemComponent;
	system : SystemInfo = {
		id: null,
		name: null,
		type: null,
		typeLink: null,
		typeDesc: null,
		typeColor: null,
		idDiscoverer: null,
		discoverer: null,
		radius: null,
		numNPC: null,
		planets: []
	};
	connections: SystemConnection[] = [];
	selectedItem = {
		type: 'system',
		id: null,
		idSystem: null,
		idPlanet: null,
		idMoon: null
	};
	planetInd: number = null;
	moonInd: number = null;
	editNameShow: boolean = false;
	editName: string = null;
	
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private as: ApiService, private cs: CommonService, private dialog: DialogService) {
		this.matIconRegistry.addSvgIcon(
			"void-system",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/system.svg")
		);
	}

	ngOnInit() {
		this.as.getSystemInfo().subscribe(result => {
			this.idPlayer = result.idPlayer;
			this.system = result.system;
			this.connections = result.connections;
			this.selectedItem.id = this.system.id;
			this.selectedItem.idSystem = this.system.id;
			this.starSystem.loadSystem(result.system);
		});
	}
	
	openEditName() {
		this.editName = this.cs.urldecode(this.system.name);
		this.editNameShow = true;
	}
	
	closeEditName() {
		this.editNameShow = false;
	}
	
	saveEditName() {
		if (this.editName=='') {
			this.dialog.alert({title: 'Error', content: '¡No puedes dejar el nombre en blanco!', ok: 'Continuar'}).subscribe(result => {});
		}
		else {
			const params: EditNameData = {
				id: this.selectedItem.id,
				type: this.selectedItem.type,
				name: this.editName
			};
			this.as.editName(params).subscribe(result => {
				if (result.status=='ok'){
					switch (this.selectedItem.type) {
						case 'system': {
							this.system.name = this.cs.urlencode(this.editName);
						}
						break;
						case 'planet': {
							let pIndex = this.system.planets.findIndex(x => x.id==this.selectedItem.idPlanet);
							this.system.planets[pIndex].name = this.cs.urlencode(this.editName);
						}
						break;
						case 'moon': {
							let pIndex = this.system.planets.findIndex(x => x.id==this.selectedItem.idPlanet);
							let mIndex = this.system.planets[pIndex].moons.findIndex(x => x.id==this.selectedItem.idPlanet);
							this.system.planets[pIndex].moons[mIndex].name = this.cs.urlencode(this.editName);
						}
						break;
					}
					this.closeEditName();
				}
				else {
					this.dialog.alert({title: 'Error', content: '¡Ha ocurrido un error al cambiar el nombre! Por favor vuelve a intentarlo.', ok: 'Continuar'}).subscribe(result => {});
				}
			});
		}
	}
	
	starSystemSelect(ev: StarSystemSelect) {
		this.selectedItem.type = ev.type;
		this.selectedItem.id = ev.id;
		switch (ev.type){
			case 'system': {
				this.selectedItem.idSystem = ev.id;
				this.selectedItem.idPlanet = null;
				this.selectedItem.idMoon = null;
			}
			break;
			case 'planet': {
				this.selectedItem.idPlanet = ev.id;
				this.selectedItem.idMoon = null;
				
				this.planetInd = this.system.planets.findIndex(x => x.id==ev.id);
			}
			break;
			case 'moon': {
				this.selectedItem.idMoon = ev.id;
				this.moonInd = this.system.planets[this.planetInd].moons.findIndex(x => x.id==ev.id);
			}
			break;
		}
	}
}
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer }    from '@angular/platform-browser';
import { ApiService }      from '../../services/api.service';
import { SystemInfo, SystemConnection } from '../../interfaces/interfaces';

@Component({
	selector: 'void-navigate',
	templateUrl: './navigate.component.html',
	styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {
	system: SystemInfo = {
		id: null,
		name: null,
		type: null,
		typeLink: null,
		typeDesc: null,
		idDiscoverer: null,
		discoverer: null,
		radius: null,
		numNPC: null,
		planets: []
	};
	connections: SystemConnection[] = [];
	@ViewChild('systemContent', { static: true }) systemContent: ElementRef;
	
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private as: ApiService) {
		this.matIconRegistry.addSvgIcon(
			"void-system",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/system.svg")
		);
	}

	ngOnInit() {
		this.as.getSystemInfo().subscribe(result => {
			this.system = result.system;
			this.connections = result.connections;
			
			console.log(this.systemContent.nativeElement.offsetWidth);
		});
	}
}
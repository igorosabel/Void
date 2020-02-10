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
	sun = {
		width: null,
		height: null,
		left: null,
		top: null
	};
	orbits = [];
	planets = [];
	
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
			this.calculateSystemCSS();
		});
	}
	
	calculateSystemCSS() {
		const maxWidth = Math.min(...[this.systemContent.nativeElement.offsetWidth, this.systemContent.nativeElement.offsetHeight]);
		let maxKm = 0;
		let pMaxRadius = 0;
		let pMaxDistance = 0;
		for (let p of this.system.planets) {
			if (p.radius>pMaxRadius){
				pMaxRadius = p.radius;
			}
			if (p.distance>pMaxDistance) {
				pMaxDistance = p.distance;
			}
		}

		const oneDistance = this.system.radius + (pMaxRadius * 1.10);
		maxKm = (oneDistance * pMaxDistance) + pMaxRadius;
		
		const ratio = maxWidth / maxKm;
		
		const sunWidth = ( (this.system.radius * 2) * ratio);
		this.sun = {
			width: sunWidth + 'px',
			height: sunWidth + 'px',
			left: 'calc(50% - ' + (sunWidth/2) + 'px)',
			top: 'calc(50% - ' + (sunWidth/2) + 'px)'
		};
		
		let animations = '';
		for (let p of this.system.planets) {
			let planetDistance = oneDistance * p.distance;			
			let orbit = planetDistance * ratio;
			let planetWidth = ( (p.radius * 2) * ratio);
			let planetOrbit = ( (planetDistance/2) - p.radius) * ratio;
			
			this.orbits.push({
				width: orbit + 'px',
				height: orbit + 'px',
				top: 'calc( 50% - ' + (orbit / 2) + 'px)',
				left: 'calc( 50% - ' + (orbit / 2) + 'px)'
			});
			
			this.planets.push({
				id: p.id,
				width: planetWidth + 'px',
				height: planetWidth + 'px',
				left: 'calc( 50% - ' + (planetWidth / 2) + 'px)',
				top: 'calc( 50% - ' + (planetWidth / 2) + 'px)',
				name: p.name,
				animation: 'planetRotate'+p.id+' '+p.rotation+'s infinite linear'
			});
			
			let distanceHalf = ( (p.radius *2) * ratio );
			animations += `
				@keyframes planetRotate${p.id}{
					from{
						transform:rotate(0deg) translate(-${distanceHalf}px) rotate(0deg);
					}
					to{
						transform:rotate(360deg) translate(-${distanceHalf}px) rotate(-360deg);
					}
				}
			`;
		}
		
		const head = document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(animations));
		head.appendChild(style);
	}
}
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SystemInfo, SystemPlanet, StarSystemSelect } from 'src/app/interfaces/interfaces';

@Component({
	selector: 'void-star-system',
	templateUrl: './star-system.component.html',
	styleUrls: ['./star-system.component.scss']
})
export class StarSystemComponent implements OnInit, OnDestroy {
	@Output() onselect: EventEmitter<StarSystemSelect> = new EventEmitter<StarSystemSelect>();
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
		fullyExplored: false,
		planets: []
	};
	@ViewChild('systemContent', { static: true }) systemContent: ElementRef;
	sun = {
		background: null,
		backgroundColor: null,
		width: null,
		height: null,
		left: null,
		top: null
	};
	planetOrbits = [];
	planets = [];
	planet = {
		id: null,
		name: null,
		background: null,
		width: null,
		height: null,
		left: null,
		top: null
	};
	moonOrbits = [];
	moons = [];
	moon = {
		id: null
	};

	constructor() {}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		const systemElem = document.getElementById('navigateStyles');
		systemElem.parentNode.removeChild(systemElem);
		const planetElem = document.getElementById('planetStyles');
		planetElem.parentNode.removeChild(planetElem);
	}

	loadSystem(system : SystemInfo): void {
		this.system = system;
		this.calculateSystemCSS();
	}

	selectSystem(ev: MouseEvent): void {
		ev && ev.preventDefault();
		const params: StarSystemSelect = {
			type: 'system',
			id: this.system.id
		};
		this.onselect.emit(params);
		this.planet.id = null;
		this.moon.id = null;
	}

	selectPlanet(p: SystemPlanet, ev: MouseEvent=null): void {
		ev && ev.preventDefault();
		if (p){
			const params: StarSystemSelect = {
				type: 'planet',
				id: p.id
			};
			this.onselect.emit(params);
			this.planet.id = p.id;
			this.calculatePlanetCSS();
		}
		this.moon.id = null;
	}

	selectPlanetFromMenu(planet: SystemPlanet): void {
		const ind = this.planets.findIndex(x => x.id==planet.id);
		this.selectPlanet(this.planets[ind]);
	}

	selectMoon(m): void {
		console.log(m);
	}
	
	calculateSystemCSS(): void {
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
		const typeInfo = this.system.type.split('-');
		this.sun = {
			background: "url('/assets/sun/"+typeInfo[1]+".png') no-repeat scroll center center / 100%",
			backgroundColor: this.system.typeColor,
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
			
			this.planetOrbits.push({
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
				background: "url('/assets/planet/"+p.type+".png') no-repeat scroll center center / 100%",
				name: p.name,
				animation: 'planetRotate'+p.id+' '+p.rotation+'s infinite linear'
			});
			
			let distanceHalf = orbit/2;
			animations += `
				@keyframes planetRotate${p.id}{
					from{
						transform: rotate(0deg) translate(-${distanceHalf}px) rotate(0deg);
					}
					to{
						transform: rotate(360deg) translate(-${distanceHalf}px) rotate(-360deg);
					}
				}
			`;
		}
		
		const head = document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		style.id = 'navigateStyles';
		style.type = 'text/css';
		style.appendChild(document.createTextNode(animations));
		head.appendChild(style);
	}
	
	calculatePlanetCSS(): void {
		const maxWidth = Math.min(...[this.systemContent.nativeElement.offsetWidth, this.systemContent.nativeElement.offsetHeight]);
		let planetInd = this.system.planets.findIndex(x => x.id == this.planet.id);
		const p = this.system.planets[planetInd];

		let maxKm = 0;
		let mMaxRadius = 0;
		let mMaxDistance = 0;
		for (let m of p.moons) {
			if (m.radius>mMaxRadius){
				mMaxRadius = m.radius;
			}
			if (m.distance>mMaxDistance) {
				mMaxDistance = m.distance;
			}
		}

		const oneDistance = p.radius + (mMaxRadius * 1.10);
		maxKm = (oneDistance * mMaxDistance) + mMaxRadius;
		
		const ratio = maxWidth / maxKm;
		
		const planetWidth = ( (p.radius * 2) * ratio);
		this.planet = {
			id: p.id,
			name: p.name,
			background: "url('/assets/planet/"+p.type+".png') no-repeat scroll center center / 100%",
			width: planetWidth + 'px',
			height: planetWidth + 'px',
			left: 'calc(50% - ' + (planetWidth/2) + 'px)',
			top: 'calc(50% - ' + (planetWidth/2) + 'px)'
		};
		
		let animations = '';
		this.moons = [];
		this.moonOrbits = [];
		for (let m of p.moons) {
			let moonDistance = oneDistance * m.distance;			
			let orbit = moonDistance * ratio;
			let moonWidth = ( (m.radius * 2) * ratio);
			let moonOrbit = ( (moonDistance/2) - m.radius) * ratio;
			
			this.moonOrbits.push({
				width: orbit + 'px',
				height: orbit + 'px',
				top: 'calc( 50% - ' + (orbit / 2) + 'px)',
				left: 'calc( 50% - ' + (orbit / 2) + 'px)'
			});
			
			this.moons.push({
				id: m.id,
				width: moonWidth + 'px',
				height: moonWidth + 'px',
				left: 'calc( 50% - ' + (moonWidth / 2) + 'px)',
				top: 'calc( 50% - ' + (moonWidth / 2) + 'px)',
				background: "url('/assets/moon/"+m.type+".png') no-repeat scroll center center / 100%",
				name: m.name,
				animation: 'moonRotate'+m.id+' '+m.rotation+'s infinite linear'
			});
			
			let distanceHalf = orbit/2;
			animations += `
				@keyframes moonRotate${m.id}{
					from{
						transform: rotate(0deg) translate(-${distanceHalf}px) rotate(0deg);
					}
					to{
						transform: rotate(360deg) translate(-${distanceHalf}px) rotate(-360deg);
					}
				}
			`;
		}
		
		const head = document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		style.id = 'planetStyles';
		style.type = 'text/css';
		style.appendChild(document.createTextNode(animations));
		head.appendChild(style);
	}
}
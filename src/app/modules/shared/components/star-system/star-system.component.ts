import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  OutputEmitterRef,
  Signal,
  output,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  OrbitInterface,
  PlanetDetailInterface,
  PlanetMoonInterface,
  StarSystemSelect,
  SunDetailInterface,
} from '@interfaces/interfaces';
import Star from '@model/star.model';
import SystemInfo from '@model/system-info.model';
import SystemPlanet from '@model/system-planet.model';
import Utils from '@model/utils.class';
import { NUM_STARS } from '@shared/constants';

@Component({
  selector: 'void-star-system',
  templateUrl: './star-system.component.html',
  styleUrls: ['./star-system.component.scss'],
  imports: [CommonModule, MatCardModule],
})
export default class StarSystemComponent implements OnInit, OnDestroy {
  onselect: OutputEmitterRef<StarSystemSelect> = output<StarSystemSelect>();
  system: SystemInfo = new SystemInfo();
  systemContent: Signal<ElementRef> =
    viewChild.required<ElementRef>('systemContent');
  stars: Star[] = [];
  sun: SunDetailInterface = {
    background: null,
    backgroundColor: null,
    width: null,
    height: null,
    left: null,
    top: null,
  };
  planetOrbits: OrbitInterface[] = [];
  planets: PlanetMoonInterface[] = [];
  planet: PlanetDetailInterface = {
    id: null,
    name: null,
    background: null,
    width: null,
    height: null,
    left: null,
    top: null,
  };
  moonOrbits: OrbitInterface[] = [];
  moons: PlanetMoonInterface[] = [];
  moonId: number | null = null;

  ngOnInit(): void {
    this.generateStars();
  }

  ngOnDestroy(): void {
    const systemElem: HTMLElement | null =
      document.getElementById('navigateStyles');
    if (systemElem !== null && systemElem.parentNode !== null) {
      systemElem.parentNode.removeChild(systemElem);
    }
    const planetElem: HTMLElement | null =
      document.getElementById('planetStyles');
    if (planetElem !== null && planetElem.parentNode !== null) {
      planetElem.parentNode.removeChild(planetElem);
    }
  }

  generateStars(): void {
    this.stars = Utils.stars(NUM_STARS);
  }

  loadSystem(system: SystemInfo): void {
    this.system = system;
    this.calculateSystemCSS();
  }

  selectSystem(ev: MouseEvent): void {
    ev && ev.preventDefault();
    const params: StarSystemSelect = {
      type: 'system',
      id: this.system.id,
    };
    this.onselect.emit(params);
    this.planet.id = null;
    this.moonId = null;
    this.generateStars();
  }

  selectPlanet(
    p: PlanetMoonInterface | null,
    ev: MouseEvent | null = null
  ): void {
    ev && ev.preventDefault();
    if (p !== null) {
      const params: StarSystemSelect = {
        type: 'planet',
        id: p.id,
      };
      this.onselect.emit(params);
      this.planet.id = p.id;
      this.calculatePlanetCSS();
    }
    this.moonId = null;
    this.generateStars();
  }

  selectPlanetFromMenu(planet: SystemPlanet): void {
    const ind: number = this.planets.findIndex(
      (x: PlanetMoonInterface): boolean => x.id == planet.id
    );
    this.selectPlanet(this.planets[ind]);
  }

  selectMoon(m: PlanetMoonInterface): void {
    console.log(m);
  }

  calculateSystemCSS(): void {
    const maxWidth: number = Math.min(
      ...[
        this.systemContent().nativeElement.offsetWidth,
        this.systemContent().nativeElement.offsetHeight,
      ]
    );
    let maxKm: number = 0;
    let pMaxRadius: number = 0;
    let pMaxDistance: number = 0;
    for (const p of this.system.planets) {
      if (p.radius !== null && p.radius > pMaxRadius) {
        pMaxRadius = p.radius;
      }
      if (p.distance !== null && p.distance > pMaxDistance) {
        pMaxDistance = p.distance;
      }
    }

    const systemRadius: number =
      this.system.radius !== null ? this.system.radius : 0;
    const oneDistance: number = systemRadius + pMaxRadius * 1.1;
    maxKm = oneDistance * pMaxDistance + pMaxRadius;

    const ratio: number = maxWidth / maxKm;

    const sunWidth: number = systemRadius * 2 * ratio;
    const typeInfo: string[] =
      this.system.type !== null ? this.system.type.split('-') : [];
    this.sun = {
      background: `url('/sun/${typeInfo[1]}.png') no-repeat scroll center center / 100%`,
      backgroundColor: this.system.typeColor,
      width: `${sunWidth}px`,
      height: `${sunWidth}px`,
      left: `calc(50% - ${sunWidth / 2}px)`,
      top: `calc(50% - ${sunWidth / 2}px)`,
    };

    let animations: string = '';
    for (const p of this.system.planets) {
      const pDistance: number = p.distance !== null ? p.distance : 0;
      const pRadius: number = p.radius !== null ? p.radius : 0;
      const pId: number = p.id !== null ? p.id : -1;
      const pName: string = p.name !== null ? p.name : '';

      const planetDistance: number = oneDistance * pDistance;
      const orbit: number = planetDistance * ratio;
      const planetWidth: number = pRadius * 2 * ratio;
      //const planetOrbit: number = (planetDistance / 2 - p.radius) * ratio;

      this.planetOrbits.push({
        width: `${orbit}px`,
        height: `${orbit}px`,
        top: `calc( 50% - ${orbit / 2}px)`,
        left: `calc( 50% - ${orbit / 2}px)`,
      });

      this.planets.push({
        id: pId,
        width: `${planetWidth}px`,
        height: `${planetWidth}px`,
        left: `calc( 50% - ${planetWidth / 2}px)`,
        top: `calc( 50% - ${planetWidth / 2}px)`,
        background: `url('/planet/${p.type}.png') no-repeat scroll center center / 100%`,
        name: pName,
        animation: `planetRotate${p.id} ${p.rotation}s infinite linear`,
      });

      const distanceHalf: number = orbit / 2;
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

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    const style: HTMLStyleElement = document.createElement('style');
    style.id = 'navigateStyles';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(animations));
    head.appendChild(style);
  }

  calculatePlanetCSS(): void {
    const maxWidth: number = Math.min(
      ...[
        this.systemContent().nativeElement.offsetWidth,
        this.systemContent().nativeElement.offsetHeight,
      ]
    );
    const planetInd: number = this.system.planets.findIndex(
      (x: SystemPlanet): boolean => x.id == this.planet.id
    );
    const p: SystemPlanet = this.system.planets[planetInd];
    const pRadius: number = p.radius !== null ? p.radius : 0;

    let maxKm: number = 0;
    let mMaxRadius: number = 0;
    let mMaxDistance: number = 0;
    for (const m of p.moons) {
      if (m.radius !== null && m.radius > mMaxRadius) {
        mMaxRadius = m.radius;
      }
      if (m.distance !== null && m.distance > mMaxDistance) {
        mMaxDistance = m.distance;
      }
    }

    const oneDistance: number = pRadius + mMaxRadius * 1.1;
    maxKm = oneDistance * mMaxDistance + mMaxRadius;

    const ratio: number = maxWidth / maxKm;

    const planetWidth: number = pRadius * 2 * ratio;
    this.planet = {
      id: p.id,
      name: p.name,
      background: `url('/planet/${p.type}.png') no-repeat scroll center center / 100%`,
      width: `${planetWidth}px`,
      height: `${planetWidth}px`,
      left: `calc(50% - ${planetWidth / 2}px)`,
      top: `calc(50% - ${planetWidth / 2}px)`,
    };

    let animations: string = '';
    this.moons = [];
    this.moonOrbits = [];
    for (const m of p.moons) {
      const mDistance: number = m.distance !== null ? m.distance : 0;
      const mRadius: number = m.radius !== null ? m.radius : 0;
      const mId: number = m.id !== null ? m.id : -1;
      const mName: string = m.name !== null ? m.name : '';

      const moonDistance: number = oneDistance * mDistance;
      const orbit: number = moonDistance * ratio;
      const moonWidth: number = mRadius * 2 * ratio;
      //const moonOrbit: number = (moonDistance / 2 - m.radius) * ratio;

      this.moonOrbits.push({
        width: `${orbit}px`,
        height: `${orbit}px`,
        top: `calc( 50% - ${orbit / 2}px)`,
        left: `calc( 50% - ${orbit / 2}px)`,
      });

      this.moons.push({
        id: mId,
        name: mName,
        background: `url('/moon/${m.type}.png') no-repeat scroll center center / 100%`,
        width: `${moonWidth}px`,
        height: `${moonWidth}px`,
        left: `calc( 50% - ${moonWidth / 2}px)`,
        top: `calc( 50% - ${moonWidth / 2}px)`,
        animation: `moonRotate${m.id} ${m.rotation}s infinite linear`,
      });

      const distanceHalf: number = orbit / 2;
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

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    const style: HTMLStyleElement = document.createElement('style');
    style.id = 'planetStyles';
    style.appendChild(document.createTextNode(animations));
    head.appendChild(style);
  }
}

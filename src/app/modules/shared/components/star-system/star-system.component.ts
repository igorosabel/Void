import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  OrbitInterface,
  PlanetDetailInterface,
  PlanetMoonInterface,
  StarSystemSelect,
  SunDetailInterface,
} from "src/app/interfaces/interfaces";
import { Star } from "src/app/model/star.model";
import { SystemInfo } from "src/app/model/system-info.model";
import { SystemPlanet } from "src/app/model/system-planet.model";
import { Utils } from "src/app/model/utils.class";
import { MaterialModule } from "src/app/modules/material/material.module";
import { NUM_STARS } from "src/app/modules/shared/constants";

@Component({
  standalone: true,
  selector: "void-star-system",
  templateUrl: "./star-system.component.html",
  styleUrls: ["./star-system.component.scss"],
  imports: [CommonModule, MaterialModule],
})
export class StarSystemComponent implements OnInit, OnDestroy {
  @Output() onselect: EventEmitter<StarSystemSelect> =
    new EventEmitter<StarSystemSelect>();
  system: SystemInfo = new SystemInfo();
  @ViewChild("systemContent", { static: true }) systemContent: ElementRef;
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
  moonId: number = null;

  constructor() {}

  ngOnInit(): void {
    this.generateStars();
  }

  ngOnDestroy(): void {
    const systemElem: HTMLElement = document.getElementById("navigateStyles");
    systemElem && systemElem.parentNode.removeChild(systemElem);
    const planetElem: HTMLElement = document.getElementById("planetStyles");
    planetElem && planetElem.parentNode.removeChild(planetElem);
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
      type: "system",
      id: this.system.id,
    };
    this.onselect.emit(params);
    this.planet.id = null;
    this.moonId = null;
    this.generateStars();
  }

  selectPlanet(p: PlanetMoonInterface, ev: MouseEvent = null): void {
    ev && ev.preventDefault();
    if (p) {
      const params: StarSystemSelect = {
        type: "planet",
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
        this.systemContent.nativeElement.offsetWidth,
        this.systemContent.nativeElement.offsetHeight,
      ]
    );
    let maxKm: number = 0;
    let pMaxRadius: number = 0;
    let pMaxDistance: number = 0;
    for (const p of this.system.planets) {
      if (p.radius > pMaxRadius) {
        pMaxRadius = p.radius;
      }
      if (p.distance > pMaxDistance) {
        pMaxDistance = p.distance;
      }
    }

    const oneDistance: number = this.system.radius + pMaxRadius * 1.1;
    maxKm = oneDistance * pMaxDistance + pMaxRadius;

    const ratio: number = maxWidth / maxKm;

    const sunWidth: number = this.system.radius * 2 * ratio;
    const typeInfo: string[] = this.system.type.split("-");
    this.sun = {
      background:
        "url('/assets/sun/" +
        typeInfo[1] +
        ".png') no-repeat scroll center center / 100%",
      backgroundColor: this.system.typeColor,
      width: sunWidth + "px",
      height: sunWidth + "px",
      left: "calc(50% - " + sunWidth / 2 + "px)",
      top: "calc(50% - " + sunWidth / 2 + "px)",
    };

    let animations: string = "";
    for (const p of this.system.planets) {
      const planetDistance: number = oneDistance * p.distance;
      const orbit: number = planetDistance * ratio;
      const planetWidth: number = p.radius * 2 * ratio;
      //const planetOrbit: number = (planetDistance / 2 - p.radius) * ratio;

      this.planetOrbits.push({
        width: orbit + "px",
        height: orbit + "px",
        top: "calc( 50% - " + orbit / 2 + "px)",
        left: "calc( 50% - " + orbit / 2 + "px)",
      });

      this.planets.push({
        id: p.id,
        width: planetWidth + "px",
        height: planetWidth + "px",
        left: "calc( 50% - " + planetWidth / 2 + "px)",
        top: "calc( 50% - " + planetWidth / 2 + "px)",
        background:
          "url('/assets/planet/" +
          p.type +
          ".png') no-repeat scroll center center / 100%",
        name: p.name,
        animation:
          "planetRotate" + p.id + " " + p.rotation + "s infinite linear",
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

    const head: HTMLHeadElement = document.getElementsByTagName("head")[0];
    const style: HTMLStyleElement = document.createElement("style");
    style.id = "navigateStyles";
    style.type = "text/css";
    style.appendChild(document.createTextNode(animations));
    head.appendChild(style);
  }

  calculatePlanetCSS(): void {
    const maxWidth: number = Math.min(
      ...[
        this.systemContent.nativeElement.offsetWidth,
        this.systemContent.nativeElement.offsetHeight,
      ]
    );
    const planetInd: number = this.system.planets.findIndex(
      (x: SystemPlanet): boolean => x.id == this.planet.id
    );
    const p: SystemPlanet = this.system.planets[planetInd];

    let maxKm: number = 0;
    let mMaxRadius: number = 0;
    let mMaxDistance: number = 0;
    for (const m of p.moons) {
      if (m.radius > mMaxRadius) {
        mMaxRadius = m.radius;
      }
      if (m.distance > mMaxDistance) {
        mMaxDistance = m.distance;
      }
    }

    const oneDistance: number = p.radius + mMaxRadius * 1.1;
    maxKm = oneDistance * mMaxDistance + mMaxRadius;

    const ratio: number = maxWidth / maxKm;

    const planetWidth: number = p.radius * 2 * ratio;
    this.planet = {
      id: p.id,
      name: p.name,
      background:
        "url('/assets/planet/" +
        p.type +
        ".png') no-repeat scroll center center / 100%",
      width: planetWidth + "px",
      height: planetWidth + "px",
      left: "calc(50% - " + planetWidth / 2 + "px)",
      top: "calc(50% - " + planetWidth / 2 + "px)",
    };

    let animations: string = "";
    this.moons = [];
    this.moonOrbits = [];
    for (const m of p.moons) {
      const moonDistance: number = oneDistance * m.distance;
      const orbit: number = moonDistance * ratio;
      const moonWidth: number = m.radius * 2 * ratio;
      //const moonOrbit: number = (moonDistance / 2 - m.radius) * ratio;

      this.moonOrbits.push({
        width: orbit + "px",
        height: orbit + "px",
        top: "calc( 50% - " + orbit / 2 + "px)",
        left: "calc( 50% - " + orbit / 2 + "px)",
      });

      this.moons.push({
        id: m.id,
        name: m.name,
        background:
          "url('/assets/moon/" +
          m.type +
          ".png') no-repeat scroll center center / 100%",
        width: moonWidth + "px",
        height: moonWidth + "px",
        left: "calc( 50% - " + moonWidth / 2 + "px)",
        top: "calc( 50% - " + moonWidth / 2 + "px)",
        animation: "moonRotate" + m.id + " " + m.rotation + "s infinite linear",
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

    const head: HTMLHeadElement = document.getElementsByTagName("head")[0];
    const style: HTMLStyleElement = document.createElement("style");
    style.id = "planetStyles";
    style.appendChild(document.createTextNode(animations));
    head.appendChild(style);
  }
}

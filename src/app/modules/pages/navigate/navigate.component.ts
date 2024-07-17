import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { DomSanitizer } from '@angular/platform-browser';
import {
  EditNameData,
  NavigateSelectedSystemInterface,
  StarSystemSelect,
  StatusResult,
  SystemConnectionInterface,
  SystemResult,
} from '@interfaces/interfaces';
import SystemConnection from '@model/system-connection.model';
import SystemInfo from '@model/system-info.model';
import SystemMoon from '@model/system-moon.model';
import SystemPlanet from '@model/system-planet.model';
import ApiService from '@services/api.service';
import DialogService from '@services/dialog.service';
import HeaderComponent from '@shared/components/header/header.component';
import JobComponent from '@shared/components/job/job.component';
import StarSystemComponent from '@shared/components/star-system/star-system.component';
import TimeFormatPipe from '@shared/pipes/time-format.pipe';

@Component({
  standalone: true,
  selector: 'void-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    StarSystemComponent,
    JobComponent,
    TimeFormatPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DialogService],
})
export default class NavigateComponent implements OnInit {
  private matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private domSanitizer: DomSanitizer = inject(DomSanitizer);
  private as: ApiService = inject(ApiService);
  private dialog: DialogService = inject(DialogService);

  idPlayer: number = null;
  starSystem: Signal<StarSystemComponent> =
    viewChild<StarSystemComponent>('starSystem');
  job: Signal<JobComponent> = viewChild<JobComponent>('job');
  system: SystemInfo = new SystemInfo();
  connections: SystemConnection[] = [];
  selectedItem: NavigateSelectedSystemInterface = {
    type: 'system',
    id: null,
    idSystem: null,
    idPlanet: null,
    idMoon: null,
  };
  planetInd: number = null;
  moonInd: number = null;
  editNameShow: boolean = false;
  editName: string = null;

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'void-system',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/img/system.svg')
    );
  }

  ngOnInit(): void {
    this.as.getSystemInfo().subscribe((result: SystemResult): void => {
      this.idPlayer = result.idPlayer;
      this.system = new SystemInfo().fromInterface(result.system);
      this.connections = result.connections.map(
        (item: SystemConnectionInterface): SystemConnection => {
          return new SystemConnection().fromInterface(item);
        }
      );
      this.selectedItem.id = this.system.id;
      this.selectedItem.idSystem = this.system.id;
      this.starSystem().loadSystem(this.system);
    });
  }

  openEditName(): void {
    this.editName = this.system.name;
    this.editNameShow = true;
  }

  closeEditName(): void {
    this.editNameShow = false;
  }

  saveEditName(): void {
    if (this.editName == '') {
      this.dialog.alert({
        title: 'Error',
        content: '¡No puedes dejar el nombre en blanco!',
        ok: 'Continuar',
      });
    } else {
      const params: EditNameData = {
        id: this.selectedItem.id,
        type: this.selectedItem.type,
        name: this.editName,
      };
      this.as.editName(params).subscribe((result: StatusResult): void => {
        if (result.status == 'ok') {
          switch (this.selectedItem.type) {
            case 'system':
              {
                this.system.name = this.editName;
              }
              break;
            case 'planet':
              {
                const pIndex: number = this.system.planets.findIndex(
                  (x: SystemPlanet): boolean =>
                    x.id == this.selectedItem.idPlanet
                );
                this.system.planets[pIndex].name = this.editName;
              }
              break;
            case 'moon':
              {
                const pIndex: number = this.system.planets.findIndex(
                  (x: SystemPlanet): boolean =>
                    x.id == this.selectedItem.idPlanet
                );
                const mIndex: number = this.system.planets[
                  pIndex
                ].moons.findIndex(
                  (x: SystemMoon): boolean => x.id == this.selectedItem.idPlanet
                );
                this.system.planets[pIndex].moons[mIndex].name = this.editName;
              }
              break;
          }
          this.closeEditName();
        } else {
          this.dialog.alert({
            title: 'Error',
            content:
              '¡Ha ocurrido un error al cambiar el nombre! Por favor vuelve a intentarlo.',
            ok: 'Continuar',
          });
        }
      });
    }
  }

  starSystemSelect(ev: StarSystemSelect): void {
    this.selectedItem.type = ev.type;
    this.selectedItem.id = ev.id;
    switch (ev.type) {
      case 'system':
        {
          this.selectedItem.idSystem = ev.id;
          this.selectedItem.idPlanet = null;
          this.selectedItem.idMoon = null;
        }
        break;
      case 'planet':
        {
          this.selectedItem.idPlanet = ev.id;
          this.selectedItem.idMoon = null;

          this.planetInd = this.system.planets.findIndex(
            (x: SystemPlanet): boolean => x.id == ev.id
          );
        }
        break;
      case 'moon':
        {
          this.selectedItem.idMoon = ev.id;
          this.moonInd = this.system.planets[this.planetInd].moons.findIndex(
            (x: SystemMoon): boolean => x.id == ev.id
          );
        }
        break;
    }
  }

  selectPlanet(planet: SystemPlanet): void {
    this.starSystem().selectPlanetFromMenu(planet);
  }

  explorePlanet(): void {
    this.job().startJob(1, this.system.planets[this.planetInd].exploreTime);
  }
}

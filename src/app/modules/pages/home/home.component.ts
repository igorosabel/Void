import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CurrentSystemStatus } from '@interfaces/interfaces';
import CurrentSystem from '@model/current-system.model';
import ApiService from '@services/api.service';
import HeaderComponent from '@shared/components/header/header.component';
import HomeShopComponent from '@shared/components/home-shop/home-shop.component';

@Component({
  standalone: true,
  selector: 'void-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    HeaderComponent,
    HomeShopComponent,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
})
export default class HomeComponent implements OnInit {
  private as: ApiService = inject(ApiService);

  system: CurrentSystem = new CurrentSystem();
  shop: Signal<HomeShopComponent> = viewChild<HomeShopComponent>('shop');

  ngOnInit(): void {
    this.as
      .getCurrentSystem()
      .subscribe((response: CurrentSystemStatus): void => {
        if (response.status === 'ok') {
          this.system = new CurrentSystem().fromInterface(response.system);
        }
      });
  }

  openShop(id: number): void {
    this.shop().loadShop(id);
  }

  buySell(credits: number): void {
    this.system.credits = credits;
  }
}

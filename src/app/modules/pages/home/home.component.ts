import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CurrentSystemStatus } from "src/app/interfaces/interfaces";
import { CurrentSystem } from "src/app/model/current-system.model";
import { HeaderComponent } from "src/app/modules/shared/components/header/header.component";
import { HomeShopComponent } from "src/app/modules/shared/components/home-shop/home-shop.component";
import { ApiService } from "src/app/services/api.service";

@Component({
  standalone: true,
  selector: "void-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
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
  system: CurrentSystem = new CurrentSystem();
  @ViewChild("shop", { static: true }) shop: HomeShopComponent;

  constructor(private as: ApiService) {}

  ngOnInit(): void {
    this.as
      .getCurrentSystem()
      .subscribe((response: CurrentSystemStatus): void => {
        if (response.status === "ok") {
          this.system = new CurrentSystem().fromInterface(response.system);
        }
      });
  }

  openShop(id: number): void {
    this.shop.loadShop(id);
  }

  buySell(credits: number): void {
    this.system.credits = credits;
  }
}

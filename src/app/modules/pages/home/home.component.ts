import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CurrentSystemStatus } from "src/app/interfaces/interfaces";
import { CurrentSystem } from "src/app/model/current-system.model";
import { MaterialModule } from "src/app/modules/material/material.module";
import { HeaderComponent } from "src/app/modules/shared/components/header/header.component";
import { HomeShopComponent } from "src/app/modules/shared/components/home-shop/home-shop.component";
import { ApiService } from "src/app/services/api.service";

@Component({
  standalone: true,
  selector: "void-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [CommonModule, MaterialModule, HeaderComponent, HomeShopComponent],
})
export default class HomeComponent implements OnInit {
  system: CurrentSystem = new CurrentSystem();
  @ViewChild("shop", { static: true }) shop: HomeShopComponent;

  constructor(private as: ApiService) {}

  ngOnInit(): void {
    this.as
      .getCurrentSystem()
      .subscribe((response: CurrentSystemStatus): void => {
        if (response.status == "ok") {
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

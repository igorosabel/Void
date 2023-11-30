import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DomSanitizer } from "@angular/platform-browser";
import {
  NPCShopStatus,
  SellItemsStatus,
  ShopData,
} from "src/app/interfaces/interfaces";
import { Module } from "src/app/model/module.model";
import { NPC } from "src/app/model/npc.model";
import { Ship } from "src/app/model/ship.model";
import { ShopModule } from "src/app/model/shop-module.model";
import { ShopResource } from "src/app/model/shop-resource.model";
import { ShopSelectedItem } from "src/app/model/shop-selected-item.model";
import { ShopShip } from "src/app/model/shop-ship.model";
import {
  ENGINES,
  GENERATORS,
  HULLS,
  MODULES,
} from "src/app/modules/shared/constants";
import { ApiService } from "src/app/services/api.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { DialogService } from "src/app/services/dialog.service";

@Component({
  standalone: true,
  selector: "void-home-shop",
  templateUrl: "./home-shop.component.html",
  styleUrls: ["./home-shop.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [DialogService],
})
export class HomeShopComponent {
  idNPC: number;
  show: boolean = false;
  loaded: boolean = false;
  buying: boolean = false;
  selling: boolean = false;
  shopTab: string = "buy";
  @Input() credits: number = 0;
  @Output() buySellEvent: EventEmitter<number> = new EventEmitter<number>();
  npc: NPC = new NPC();
  shopStep: number = 1;
  selectedItem: ShopSelectedItem = new ShopSelectedItem();
  private shopNum: ElementRef;
  @ViewChild("shopNum", { static: true }) set content(content: ElementRef) {
    this.shopNum = content;
  }
  moduleTypes = MODULES;
  hullTypes = HULLS;
  engineTypes = ENGINES;
  generatorTypes = GENERATORS;
  playerSellingShips: Ship[] = [];
  playerSellingModules: Module[] = [];
  playerSellingResources: ShopResource[] = [];
  sellStep: number = 1;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private as: ApiService,
    private dialog: DialogService,
    private cms: ClassMapperService
  ) {
    this.matIconRegistry.addSvgIcon(
      "void-ship",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ship.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-1",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_1.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-2",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_2.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-3",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_3.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-4",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_4.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-5",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_5.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-6",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_6.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-7",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_7.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-8",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_8.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-9",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_9.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-10",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_10.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-11",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_11.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-12",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_12.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-13",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_13.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "void-resource-14",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/resources/resource_14.svg"
      )
    );
  }

  loadShop(id: number): void {
    this.show = true;
    this.idNPC = id;
    this.shopTab = "buy";
    this.shopStep = 1;
    this.sellStep = 1;
    this.buying = false;
    this.selectedItem = new ShopSelectedItem();
    this.loadNPC();
  }

  loadNPC(): void {
    this.as.getNPCShop(this.idNPC).subscribe((result: NPCShopStatus): void => {
      this.npc = new NPC().fromInterface(result.npc);
      this.loaded = true;

      this.as
        .getSellItems(this.npc.id)
        .subscribe((result: SellItemsStatus): void => {
          this.playerSellingShips = this.cms.getShips(result.ships);
          this.playerSellingModules = this.cms.getModules(result.modules);
          this.playerSellingResources = this.cms.getShopResources(
            result.resources
          );
        });
    });
  }

  closeShop(): void {
    this.show = false;
    this.loaded = false;
  }

  selectTab(tab: string, ev: MouseEvent): void {
    ev.preventDefault();
    this.shopTab = tab;
  }

  selectShip(ship: ShopShip): void {
    this.selectedItem.id = ship.ship.id;
    this.selectedItem.type = 1;
    this.selectedItem.name = ship.ship.name;
    this.selectedItem.num = 1;
    this.selectedItem.max = ship.value;
    this.selectedItem.price = ship.ship.credits;
    this.selectedItem.credits = ship.ship.credits;
    this.selectedItem.ship = ship.ship;
    this.shopStep = 2;
  }

  selectModule(module: ShopModule): void {
    this.selectedItem.id = module.module.id;
    this.selectedItem.type = 2;
    this.selectedItem.name = module.module.name;
    this.selectedItem.num = 1;
    this.selectedItem.max = module.value;
    this.selectedItem.price = module.module.credits;
    this.selectedItem.credits = module.module.credits;
    this.selectedItem.module = module.module;
    this.shopStep = 2;
  }

  selectResource(resource: ShopResource): void {
    this.selectedItem.id = resource.resource.id;
    this.selectedItem.type = 3;
    this.selectedItem.name = resource.resource.name;
    this.selectedItem.num = 1;
    this.selectedItem.max = resource.value;
    this.selectedItem.price = resource.resource.credits;
    this.selectedItem.credits = resource.resource.credits;
    this.selectedItem.resource = resource.resource;
    this.shopStep = 2;
  }

  backToStepOne(): void {
    this.shopStep = 1;
  }

  updateSelectedItemCredits(): void {
    console.log(this.selectedItem);
    if (this.selectedItem.num > this.selectedItem.max) {
      this.selectedItem.num = this.selectedItem.max;
      this.shopNum.nativeElement.value = this.selectedItem.num;
    }
    this.selectedItem.credits = this.selectedItem.price * this.selectedItem.num;
    console.log(this.selectedItem);
  }

  buy(): void {
    this.buying = true;
    const params: ShopData = {
      idNPC: this.npc.id,
      id: this.selectedItem.id,
      type: this.selectedItem.type,
      num: this.selectedItem.num,
    };
    this.as.buy(params).subscribe((result) => {
      this.buying = false;
      if (result.status == "ok") {
        this.loadNPC();
        this.credits -= this.selectedItem.credits;

        this.buySellEvent.emit(this.credits);
        this.shopStep = 3;
      } else if (result.status == "no-room") {
        this.dialog.alert({
          title: "Error",
          content:
            "¡No tienes suficiente espacio de almacenamiento en tu nave para comprar este recurso! Espacio disponible: " +
            result.info,
          ok: "Continuar",
        });
      } else {
        this.dialog.alert({
          title: "Error",
          content:
            "¡Ocurrió un error al confirmar la compra! Vuelve a intentarlo de nuevo, por favor.",
          ok: "Continuar",
        });
      }
    });
  }

  sellShip(ship: Ship): void {
    this.selectedItem.id = ship.id;
    this.selectedItem.type = 1;
    this.selectedItem.name = ship.name;
    this.selectedItem.num = 1;
    this.selectedItem.max = 1;
    this.selectedItem.credits = ship.credits;
    this.selectedItem.ship = ship;
    this.sellStep = 2;
  }

  sellModule(module: Module): void {
    this.selectedItem.id = module.id;
    this.selectedItem.type = 2;
    this.selectedItem.name = module.name;
    this.selectedItem.num = 1;
    this.selectedItem.max = 1;
    this.selectedItem.credits = module.credits;
    this.selectedItem.module = module;
    this.sellStep = 2;
  }

  sellResource(resource: ShopResource): void {
    this.selectedItem.id = resource.resource.id;
    this.selectedItem.type = 3;
    this.selectedItem.name = resource.resource.name;
    this.selectedItem.num = 1;
    this.selectedItem.max = resource.value;
    this.selectedItem.price = resource.resource.credits;
    this.selectedItem.credits = resource.resource.credits;
    this.selectedItem.resource = resource.resource;
    this.sellStep = 2;
  }

  backToSellStepOne(): void {
    this.sellStep = 1;
  }

  sell(): void {
    this.selling = true;
    const params: ShopData = {
      idNPC: this.npc.id,
      id: this.selectedItem.id,
      type: this.selectedItem.type,
      num: this.selectedItem.num,
    };
    this.as.sell(params).subscribe((result) => {
      this.selling = false;
      if (result.status == "ok") {
        this.loadNPC();
        this.credits += this.selectedItem.credits;

        this.buySellEvent.emit(this.credits);
        this.sellStep = 3;
      } else {
        this.dialog.alert({
          title: "Error",
          content:
            "¡Ocurrió un error al confirmar la compra! Vuelve a intentarlo de nuevo, por favor.",
          ok: "Continuar",
        });
      }
    });
  }
}

import { Component } from "@angular/core";
import { HeaderComponent } from "src/app/modules/shared/components/header/header.component";

@Component({
  standalone: true,
  selector: "void-ship",
  templateUrl: "./ship.component.html",
  styleUrls: ["./ship.component.scss"],
  imports: [HeaderComponent],
})
export default class ShipComponent {}

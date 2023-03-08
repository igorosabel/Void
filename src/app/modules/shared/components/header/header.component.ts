import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/modules/material/material.module";

@Component({
  standalone: true,
  selector: "void-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class HeaderComponent {
  @Input() selected: string = "home";
  @Input() numMessages: number = 0;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "void-ship",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ship.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "void-system",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/system.svg")
    );
  }
}

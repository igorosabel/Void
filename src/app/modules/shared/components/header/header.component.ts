import { CommonModule } from "@angular/common";
import { Component, InputSignal, input } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "void-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule],
})
export class HeaderComponent {
  selected: InputSignal<string> = input<string>();
  numMessages: InputSignal<number> = input<number>(0);

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

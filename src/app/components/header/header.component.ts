import { Component, Input } from '@angular/core';
import { MatIconRegistry }   from "@angular/material/icon";
import { DomSanitizer }      from "@angular/platform-browser";

@Component({
	selector: 'void-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	@Input() selected : string = 'home';

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
		this.matIconRegistry.addSvgIcon(
			"ship",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ship.svg")
		);
		this.matIconRegistry.addSvgIcon(
			"system",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/system.svg")
		);
	}
}
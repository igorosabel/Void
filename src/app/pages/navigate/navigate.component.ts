import { Component, OnInit } from '@angular/core';
import { MatIconRegistry }   from '@angular/material/icon';
import { DomSanitizer }      from '@angular/platform-browser';

@Component({
	selector: 'void-navigate',
	templateUrl: './navigate.component.html',
	styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
		this.matIconRegistry.addSvgIcon(
			"void-system",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/system.svg")
		);
	}

	ngOnInit() {}
}
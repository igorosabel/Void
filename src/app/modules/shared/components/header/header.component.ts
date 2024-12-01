import { Component, InputSignal, inject, input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'void-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, MatToolbarModule, MatIconModule],
})
export default class HeaderComponent {
  private matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private domSanitizer: DomSanitizer = inject(DomSanitizer);

  selected: InputSignal<string> = input<string>('');
  numMessages: InputSignal<number> = input<number>(0);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'void-ship',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/img/ship.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'void-system',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/img/system.svg')
    );
  }
}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-shell',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    NgOptimizedImage,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './game-shell.html',
  styleUrl: './game-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GameShellComponent {}

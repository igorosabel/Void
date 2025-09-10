import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import type {
  HomeResponse,
  NpcSummary,
  PlanetSummary,
  PlayerPresenceItem,
  SystemSummary,
} from '@interfaces/home.interfaces';
import GameService from '@services/game-service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  private game: GameService = inject(GameService);

  private _data: WritableSignal<HomeResponse | null> =
    signal<HomeResponse | null>(null);
  readonly data: Signal<HomeResponse | null> = this._data.asReadonly();

  readonly loading: WritableSignal<boolean> = signal<boolean>(true);

  readonly players: Signal<PlayerPresenceItem[]> = computed(
    (): PlayerPresenceItem[] => this._data()?.players ?? []
  );
  readonly npcs: Signal<NpcSummary[]> = computed(
    (): NpcSummary[] => this._data()?.npcs ?? []
  );
  readonly planets: Signal<PlanetSummary[]> = computed(
    (): PlanetSummary[] => this._data()?.planets ?? []
  );
  readonly systemName: Signal<string> = computed((): string => {
    const s: SystemSummary | undefined = this._data()?.system;
    return s ? s.custom_name || s.original_name : '';
  });

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    try {
      const res: HomeResponse = await this.game.getHome();
      this._data.set(res);
    } finally {
      this.loading.set(false);
    }
  }
}

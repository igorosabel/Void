// auth.store.ts
import {
  Injectable,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import {
  LoginResponse,
  PlayerSummary,
  SessionData,
  ShipSummary,
  SystemSummary,
} from '@interfaces/interfaces';

const LS_KEY = 'void.session.v1';

@Injectable({ providedIn: 'root' })
export default class AuthStore {
  // estado
  private _player: WritableSignal<PlayerSummary | null> =
    signal<PlayerSummary | null>(null);
  private _system = signal<SystemSummary | null>(null);
  private _ship = signal<ShipSummary | null>(null);

  private _accessToken = signal<string | null>(null);
  private _accessExpires = signal<number | null>(null); // epoch ms
  private _refreshToken = signal<string | null>(null); // si no usas cookie

  // derivados
  readonly isAuthenticated = computed(() => {
    const t = this._accessToken();
    const exp = this._accessExpires();
    return !!t && !!exp && Date.now() < exp;
  });

  // Persistencia automática
  constructor() {
    effect(() => {
      const data: SessionData = {
        player: this._player(),
        system: this._system(),
        ship: this._ship(),
        // guarda refresh token solo si lo usas en JS:
        refresh_token: this._refreshToken() ?? undefined,
        // opcional: guardar access para rehidratación ultra-rápida (se revalida igual)
        access_token: this._accessToken() ?? undefined,
        access_expires_at: this._accessExpires() ?? undefined,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    });
  }

  /** Rehidrata el estado desde localStorage (llamar en el arranque de la app). */
  hydrate(): void {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as SessionData;
      this._player.set(data.player ?? null);
      this._system.set(data.system ?? null);
      this._ship.set(data.ship ?? null);
      this._refreshToken.set(data.refresh_token ?? null);
      this._accessToken.set(data.access_token ?? null);
      this._accessExpires.set(data.access_expires_at ?? null);
    } catch {
      /* ignore */
    }
  }

  /** Aplica la respuesta del login/registro al store. */
  applyLoginResponse(res: LoginResponse): void {
    this._player.set(res.player);
    this._system.set(res.system);
    this._ship.set(res.ship);

    const now = Date.now();
    const expiresAt = now + res.tokens.expires_in * 1000;
    this._accessToken.set(res.tokens.access_token);
    this._accessExpires.set(expiresAt);

    // Guardar refresh solo si no usas cookie HttpOnly
    if (res.tokens.refresh_token) {
      this._refreshToken.set(res.tokens.refresh_token);
    }
  }

  /** Actualiza solo los tokens (tras /auth/refresh). */
  applyTokens(
    access_token: string,
    expires_in: number,
    refresh_token?: string
  ): void {
    this._accessToken.set(access_token);
    this._accessExpires.set(Date.now() + expires_in * 1000);
    if (refresh_token) this._refreshToken.set(refresh_token);
  }

  /** Limpia toda la sesión (logout). */
  clear(): void {
    this._player.set(null);
    this._system.set(null);
    this._ship.set(null);
    this._accessToken.set(null);
    this._accessExpires.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem(LS_KEY);
  }

  // getters públicos
  player() {
    return this._player();
  }

  system() {
    return this._system();
  }

  ship() {
    return this._ship();
  }

  accessToken() {
    return this._accessToken();
  }

  refreshToken() {
    return this._refreshToken();
  }
}

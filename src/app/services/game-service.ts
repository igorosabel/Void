import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import type { HomeResponse } from '@interfaces/home.interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class GameService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  async getHome(): Promise<HomeResponse> {
    return firstValueFrom(
      this.http.get<HomeResponse>(`${this.apiUrl}/game/home`)
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import {
  CurrentSystemStatus,
  EditNameData,
  ExploreData,
  LoginData,
  LoginResult,
  NPCShopStatus,
  RegisterData,
  SellItemsStatus,
  ShopData,
  StatusResult,
  SystemResult,
} from '@interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  private http: HttpClient = inject(HttpClient);

  apiUrl: string = environment.apiUrl;

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'login', data);
  }

  register(data: RegisterData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'register', data);
  }

  getCurrentSystem(): Observable<CurrentSystemStatus> {
    return this.http.post<CurrentSystemStatus>(
      this.apiUrl + 'current-system',
      {}
    );
  }

  getNPCShop(id: number): Observable<NPCShopStatus> {
    return this.http.post<NPCShopStatus>(this.apiUrl + 'npc-shop', { id });
  }

  getSellItems(id: number): Observable<SellItemsStatus> {
    return this.http.post<SellItemsStatus>(this.apiUrl + 'get-sell-items', {
      id,
    });
  }

  buy(data: ShopData): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'buy', data);
  }

  sell(data: ShopData): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'sell', data);
  }

  getSystemInfo(): Observable<SystemResult> {
    return this.http.post<SystemResult>(this.apiUrl + 'get-system-info', {});
  }

  editName(data: EditNameData): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'edit-name', data);
  }

  explore(data: ExploreData): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'explore', data);
  }
}

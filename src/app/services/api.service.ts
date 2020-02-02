import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs';
import { environment }             from '../../environments/environment';

import {
	LoginData,
	LoginResult,
	RegisterData,
	CurrentSystemStatus,
	NPCShopStatus,
	StatusResult,
	BuyData
} from '../interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	apiUrl = environment.apiUrl;

	constructor(private http : HttpClient){}

	login(data: LoginData): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'login', data);
	}

	register(data: RegisterData): Observable<LoginResult> {
		return this.http.post<LoginResult>(this.apiUrl + 'register', data);
	}
	
	getCurrentSystem(): Observable<CurrentSystemStatus> {
		return this.http.post<CurrentSystemStatus>(this.apiUrl + 'current-system', {});
	}
	
	getNPCShop(id: number): Observable<NPCShopStatus> {
		return this.http.post<NPCShopStatus>(this.apiUrl + 'npc-shop', {id});
	}
	
	buy(data: BuyData): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'buy', data);
	}
}
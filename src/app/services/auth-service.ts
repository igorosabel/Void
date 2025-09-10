import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  Tokens,
} from '@interfaces/interfaces';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  async checkEmailAvailable(email: string): Promise<boolean> {
    const url = `${this.apiUrl}/auth/check-email-available`;
    const result$: Observable<boolean> = this.http
      .post<{ available: boolean }>(url, { email })
      .pipe(map((res): boolean => res.available));
    return firstValueFrom(result$);
  }

  async register(payload: RegisterPayload): Promise<LoginResponse> {
    const url = `${this.apiUrl}/auth/register`;
    return await firstValueFrom(this.http.post<LoginResponse>(url, payload));
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const url = `${this.apiUrl}/auth/login`;
    return await firstValueFrom(this.http.post<LoginResponse>(url, payload));
  }

  async refresh(refresh_token: string): Promise<Tokens> {
    return firstValueFrom(
      this.http.post<Tokens>(`${this.apiUrl}/auth/refresh`, {
        refreshToken: refresh_token,
      })
    );
  }

  async logout(refresh_token: string, allDevices = false): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/auth/logout`, {
        refreshToken: refresh_token,
        allDevices,
      })
    );
  }
}

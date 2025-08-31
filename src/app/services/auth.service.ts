import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { RegisterPayload } from '@interfaces/interfaces';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  async checkEmailAvailable(email: string): Promise<boolean> {
    const url = `${this.apiUrl}/player/check-email-available`;
    const result$: Observable<boolean> = this.http
      .post<{ available: boolean }>(url, { email })
      .pipe(map((res): boolean => res.available));
    return firstValueFrom(result$);
  }

  async register(payload: RegisterPayload): Promise<void> {
    const url = `${this.apiUrl}/player/register`;
    await firstValueFrom(this.http.post<void>(url, payload));
  }
}

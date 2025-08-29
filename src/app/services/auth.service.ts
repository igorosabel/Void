import { Injectable } from '@angular/core';
import { RegisterPayload } from '@interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  async checkEmailAvailable(email: string): Promise<boolean> {
    // Simulación; reemplaza por HTTP real
    const taken = ['test@example.com', 'admin@voidgame.com'];
    await new Promise((r) => setTimeout(r, 300));
    return !taken.includes(email.trim().toLowerCase());
  }

  async register(payload: RegisterPayload): Promise<void> {
    console.log('Registering user:', payload);
    // POST real a tu API aquí
    await new Promise((r) => setTimeout(r, 600));
  }
}

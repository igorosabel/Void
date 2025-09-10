export interface LoginData {
  name: string;
  pass: string;
}

export interface LoginResult {
  status: string;
  id: number | null;
  name: string | null;
  token: string | null;
}

export interface RegisterData {
  name: string;
  pass: string;
  conf: string;
}

export interface StatusResult {
  status: string;
}

export interface RegisterPayload {
  email: string;
  nickname: string;
  password: string;
  acceptTerms: boolean;
}

export type PasswordStrengthType = 'debil' | 'medio' | 'fuerte';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PlayerSummary {
  id: number;
  nickname: string;
}

export interface SystemSummary {
  id: number;
  original_name: string;
}

export interface ShipSummary {
  id: number;
  id_ship_type: number;
}

export interface Tokens {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

export interface LoginResponse {
  status: string;
  player: PlayerSummary;
  system: SystemSummary | null;
  ship: ShipSummary | null;
  tokens: Tokens;
}

export interface SessionData {
  player: PlayerSummary | null;
  system: SystemSummary | null;
  ship: ShipSummary | null;
  refresh_token?: string;
  access_token?: string;
  access_expires_at?: number;
}

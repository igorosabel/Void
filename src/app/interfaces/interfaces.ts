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

export interface LoginResponse {
  status: string;
  player: {
    id: number;
    nickname: string;
  };
  system: {
    id: number;
    original_name: string;
  };
  ship: {
    id: number;
    id_ship_type: number;
  };
  tokens: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  };
}

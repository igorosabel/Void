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

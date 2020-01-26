export interface DialogField {
	title: string;
	type: string;
	value: string;
	hint?: string;
}

export interface DialogOptions {
	title: string;
	content: string;
	fields?: DialogField[];
	ok: string;
	cancel?: string;
}

export interface StatusResult {
	status: string;
}

export interface LoginData {
	name: string;
	pass: string;
}

export interface LoginResult {
	status: string;
	id: number;
	name: string;
	token: string;
}

export interface RegisterData {
	name: string;
	email: string;
	pass: string;
	conf: string;
}

export interface ShortMessage {
	id: number;
	type: number;
	name: string;
	date: string;
	message: string;
}

export interface HomeCharacter {
	id: number;
	type: number;
	name: string;
}
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

export interface CurrentSystem {
	system: string;
	star: string;
	numPlanets: number;
	credits: number;
	maxStrength: number;
	strength: number;
	messages: ShortMessage[];
	characters: HomeCharacter[];
}

export interface CurrentSystemStatus {
	status: string;
	system: CurrentSystem;
}

export interface NPC {
	id: number;
	name: string;
	idRace: number;
}

export interface NPCShopStatus {
	status: string;
	npc: NPC;
}
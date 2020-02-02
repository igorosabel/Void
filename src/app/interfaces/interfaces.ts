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

export interface StatusResult {
	status: string;
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

export interface Module {
	id: number;
	name: string;
	idType: number;
	engine: number;
	shield: number;
	cargo: number;
	damage: number;
	crew: number;
	energy: number;
	slots: number;
	credits: number;
}

export interface NPCModule {
	module: Module;
	value: number;
}

export interface Ship {
	id: number;
	name: string;
	idType: number;
	maxStrength: number;
	strength: number;
	endurance: number;
	shield: number;
	idEngine: number;
	speed: number;
	maxCargo: number;
	cargo: number;
	damage: number;
	idGenerator: number;
	maxEnergy: number;
	energy: number;
	slots: number;
	crew: number;
	credits: number;
}

export interface NPCShip {
	ship: Ship;
	value: number;
}

export interface Resource {
	id: number;
	name: string;
	credits: number;
}

export interface NPCResource {
	resource: Resource;
	value: number;
}

export interface NPC {
	id: number;
	name: string;
	idRace: number;
	ships: NPCShip[];
	modules: NPCModule[];
	resources: NPCResource[];
}

export interface NPCShopStatus {
	status: string;
	npc: NPC;
}

export interface ShopSelectedItem {
	id: number;
	type: number;
	name: string;
	num: number;
	max: number;
	price: number;
	credits: number;
	ship: Ship;
	module: Module;
	resource: Resource;
}

export interface BuyData {
	idNPC: number;
	id: number;
	type: number;
	num: number;
}
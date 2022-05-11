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

export interface UserInterface {
	id: number;
	name: string;
	token: string;
}

export interface LoginResult {
	status: string;
	user: UserInterface;
}

export interface RegisterData {
	name: string;
	email: string;
	pass: string;
	conf: string;
}

export interface StatusResult {
	status: string;
	info?: string;
}

export interface ShortMessageInterface {
	id: number;
	type: number;
	name: string;
	date: string;
	message: string;
}

export interface HomeCharacterInterface {
	id: number;
	type: number;
	name: string;
}

export interface CurrentSystemInterface {
	system: string;
	star: string;
	numPlanets: number;
	credits: number;
	maxStrength: number;
	strength: number;
	messages: ShortMessageInterface[];
	characters: HomeCharacterInterface[];
}

export interface CurrentSystemStatus {
	status: string;
	system: CurrentSystemInterface;
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

export interface ShopShip {
	ship: Ship;
	value: number;
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

export interface ShopModule {
	module: Module;
	value: number;
}

export interface Resource {
	id: number;
	name: string;
	credits: number;
}

export interface ShopResource {
	resource: Resource;
	value: number;
}

export interface NPC {
	id: number;
	name: string;
	idRace: number;
	ships: ShopShip[];
	modules: ShopModule[];
	resources: ShopResource[];
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

export interface ShopData {
	idNPC: number;
	id: number;
	type: number;
	num: number;
}

export interface SellItemsStatus {
	status: string;
	ships: Ship[];
	modules: Module[];
	resources: ShopResource[];
}

export interface SystemResourceInterface {
	id: number;
	name: string;
	value: number;
}

export interface SystemMoonInterface {
	id: number;
	name: string;
	type: number;
	distance: number;
	radius: number;
	rotation: number;
	explored: boolean;
	exploreTime: number;
	resources: SystemResourceInterface[];
}

export interface SystemPlanetInterface {
	id: number;
	name: string;
	type: string;
	typeLink: string;
	typeDesc: string;
	distance: number;
	radius: number;
	rotation: number;
	explored: boolean;
	exploreTime: number;
	resources: SystemResourceInterface[];
	moons: SystemMoonInterface[];
}

export interface SystemInfo {
	id: number;
	name: string;
	type: string;
	typeLink: string;
	typeDesc: string;
	typeColor: string;
	idDiscoverer: number;
	discoverer: string;
	radius: number;
	numNPC: number;
	fullyExplored: boolean;
	planets: SystemPlanet[];
}

export interface SystemConnection {
	idSystemEnd: number;
	order: number;
	navigateTime: number;
	name: string;
}

export interface SystemResult {
	status: string;
	idPlayer: number;
	system: SystemInfo;
	connections: SystemConnection[];
}

export interface EditNameData {
	id: number;
	type: string;
	name: string;
}

export interface StarSystemSelect {
	type: string;
	id: number;
}

export interface ExploreData {
	type: string;
	id: number;
}

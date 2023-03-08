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

export interface ShipInterface {
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

export interface ShopShipInterface {
  ship: ShipInterface;
  value: number;
}

export interface ModuleInterface {
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

export interface ShopModuleInterface {
  module: ModuleInterface;
  value: number;
}

export interface ResourceInterface {
  id: number;
  name: string;
  credits: number;
}

export interface ShopResourceInterface {
  resource: ResourceInterface;
  value: number;
}

export interface NPCInterface {
  id: number;
  name: string;
  idRace: number;
  ships: ShopShipInterface[];
  modules: ShopModuleInterface[];
  resources: ShopResourceInterface[];
}

export interface NPCShopStatus {
  status: string;
  npc: NPCInterface;
}

export interface ShopSelectedItemInterface {
  id: number;
  type: number;
  name: string;
  num: number;
  max: number;
  price: number;
  credits: number;
  ship: ShipInterface;
  module: ModuleInterface;
  resource: ResourceInterface;
}

export interface ShopData {
  idNPC: number;
  id: number;
  type: number;
  num: number;
}

export interface SellItemsStatus {
  status: string;
  ships: ShipInterface[];
  modules: ModuleInterface[];
  resources: ShopResourceInterface[];
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

export interface SystemInfoInterface {
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
  planets: SystemPlanetInterface[];
}

export interface SystemConnectionInterface {
  idSystemEnd: number;
  order: number;
  navigateTime: number;
  name: string;
}

export interface NavigateSelectedSystemInterface {
  type: string;
  id: number;
  idSystem: number;
  idPlanet: number;
  idMoon: number;
}

export interface SystemResult {
  status: string;
  idPlayer: number;
  system: SystemInfoInterface;
  connections: SystemConnectionInterface[];
}

export interface StarInterface {
  top: number;
  right: number;
  width: number;
  pulse: number;
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

export interface SunDetailInterface {
  background: string;
  backgroundColor: string;
  width: string;
  height: string;
  left: string;
  top: string;
}

export interface PlanetDetailInterface {
  id: number;
  name: string;
  background: string;
  width: string;
  height: string;
  left: string;
  top: string;
}

export interface OrbitInterface {
  width: string;
  height: string;
  top: string;
  left: string;
}

export interface PlanetMoonInterface {
  id: number;
  name: string;
  background: string;
  width: string;
  height: string;
  left: string;
  top: string;
  animation: string;
}

export interface ExploreData {
  type: string;
  id: number;
}

export interface MessageInterface {
  type1?: string;
  type2?: string;
  type3?: string;
  type4?: string;
}

export interface DataShareGlobals {
  [key: string]: any;
}

export interface ConstantValues {
  [key: string]: string;
}

export interface StatusResult {
  status: string;
}

export interface LoginData {
  name: string;
  pass: string;
}

export interface UserInterface {
  id: number | null;
  name: string | null;
  token: string | null;
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
  id: number | null;
  type: number | null;
  name: string | null;
  date: string | null;
  message: string | null;
}

export interface HomeCharacterInterface {
  id: number | null;
  type: number | null;
  name: string | null;
}

export interface CurrentSystemInterface {
  system: string | null;
  star: string | null;
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
  id: number | null;
  name: string | null;
  idType: number | null;
  maxStrength: number | null;
  strength: number | null;
  endurance: number | null;
  shield: number | null;
  idEngine: number | null;
  speed: number | null;
  maxCargo: number | null;
  cargo: number | null;
  damage: number | null;
  idGenerator: number | null;
  maxEnergy: number | null;
  energy: number | null;
  slots: number | null;
  crew: number | null;
  credits: number | null;
}

export interface ShopShipInterface {
  ship: ShipInterface | null;
  value: number | null;
}

export interface ModuleInterface {
  id: number | null;
  name: string | null;
  idType: number | null;
  engine: number | null;
  shield: number | null;
  cargo: number | null;
  damage: number | null;
  crew: number | null;
  energy: number | null;
  slots: number | null;
  credits: number | null;
}

export interface ShopModuleInterface {
  module: ModuleInterface | null;
  value: number | null;
}

export interface ResourceInterface {
  id: number | null;
  name: string | null;
  credits: number | null;
}

export interface ShopResourceInterface {
  resource: ResourceInterface | null;
  value: number | null;
}

export interface NPCInterface {
  id: number | null;
  name: string | null;
  idRace: number | null;
  ships: ShopShipInterface[];
  modules: ShopModuleInterface[];
  resources: ShopResourceInterface[];
}

export interface NPCShopStatus {
  status: string;
  npc: NPCInterface;
}

export interface ShopSelectedItemInterface {
  id: number | null;
  type: number | null;
  name: string | null;
  num: number | null;
  max: number | null;
  price: number | null;
  credits: number | null;
  ship: ShipInterface | null;
  module: ModuleInterface | null;
  resource: ResourceInterface | null;
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
  id: number | null;
  name: string | null;
  value: number | null;
}

export interface SystemMoonInterface {
  id: number | null;
  name: string | null;
  type: number | null;
  distance: number | null;
  radius: number | null;
  rotation: number | null;
  explored: boolean;
  exploreTime: number | null;
  resources: SystemResourceInterface[];
}

export interface SystemPlanetInterface {
  id: number | null;
  name: string | null;
  type: string | null;
  typeLink: string | null;
  typeDesc: string | null;
  distance: number | null;
  radius: number | null;
  rotation: number | null;
  explored: boolean;
  exploreTime: number | null;
  resources: SystemResourceInterface[];
  moons: SystemMoonInterface[];
}

export interface SystemInfoInterface {
  id: number | null;
  name: string | null;
  type: string | null;
  typeLink: string | null;
  typeDesc: string | null;
  typeColor: string | null;
  idDiscoverer: number | null;
  discoverer: string | null;
  radius: number | null;
  numNPC: number | null;
  fullyExplored: boolean;
  planets: SystemPlanetInterface[];
}

export interface SystemConnectionInterface {
  idSystemEnd: number | null;
  order: number | null;
  navigateTime: number | null;
  name: string | null;
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
  id: number | null;
}

export interface SunDetailInterface {
  background: string | null;
  backgroundColor: string | null;
  width: string | null;
  height: string | null;
  left: string | null;
  top: string | null;
}

export interface PlanetDetailInterface {
  id: number | null;
  name: string | null;
  background: string | null;
  width: string | null;
  height: string | null;
  left: string | null;
  top: string | null;
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

export interface PlayerPresenceItem {
  id: number;
  nickname: string;
}

export interface NpcSummary {
  id: number;
  name: string;
  race_code: string;
  trades: {
    mode: 'BUY' | 'SELL';
    resource_code?: string;
    module_code?: string;
  }[];
}

export interface PlanetSummary {
  id: number;
  name: string;
  body_type_code: string;
  moons_count: number;
  is_discovered: boolean;
}

export interface SystemSummary {
  id: number;
  custom_name?: string | null;
  original_name: string;
  star_class_code: string;
  planets_count: number;
  moons_total: number;
}

export interface HomeResponse {
  system: SystemSummary;
  players: PlayerPresenceItem[];
  planets: PlanetSummary[];
  npcs: NpcSummary[];
}

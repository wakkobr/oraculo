// --- 1. Tavern Menus ---
export interface TavernMenusData {
  preparations: string[];
  proteins: string[];
  bases: string[];
  vegetables: string[];
  breads_and_sides: string[];
  drinks: string[];
}

export interface TavernMealResult {
  preparation: string;
  protein: string;
  base: string;
  vegetable: string;
  breadOrSide: string;
  drink: string;
}

// --- 2. Cultural Feasts ---
export interface CulturalFeastCulture {
  id: string;
  name: string;
  origin: string;
  preparations: string[];
  main_dishes: string[];
  side_dishes: string[];
  specialties: string[];
  drinks: string[];
}

export interface CulturalFeastsData {
  cultures: CulturalFeastCulture[];
}

export interface CulturalFeastResult {
  cultureId: string;
  cultureName: string;
  origin: string;
  preparation: string;
  mainDish: string;
  sideDish: string;
  specialty: string;
  drink: string;
}

// --- 3. Street Foods & Botany ---
export interface StreetFoodStall {
  type: string;
  capacity: string;
  cost: string;
}

export interface BotanyData {
  growth: string[];
  shapes: string[];
  skins: string[];
  pulps: string[];
  properties: string[];
}

export interface StreetFoodsData {
  stalls: StreetFoodStall[];
  presentations: string[];
  flavors: string[];
  meats: string[];
  seafood: string[];
  drinks: string[];
  botany: BotanyData;
}

export interface StreetFoodResult {
  stall: StreetFoodStall;
  presentation: string;
  flavor: string;
  meat: string;
  seafood: string;
  drink: string;
  botany: {
    growth: string;
    shape: string;
    skin: string;
    pulp: string;
    property: string;
  };
}

// --- 4. Trail Rations & Wines ---
export interface TrailRationArchetype {
  name: string;
  description: string;
  meat: string;
  bread: string;
  pickle: string;
  nuts: string;
  fruit: string;
  pot_boil: string;
}

export interface WinesData {
  terroirs: string[];
  bodies: string[];
  aromas: string[];
  flavor_notes: string[];
  vessels_and_service: string[];
  legends: string[];
}

export interface TrailRationsData {
  ration_archetypes: TrailRationArchetype[];
  wines: WinesData;
}

export interface TrailRationResult {
  ration: TrailRationArchetype;
  wine: {
    terroir: string;
    body: string;
    aroma: string;
    flavorNotes: string;
    service: string;
    legend: string;
  };
}
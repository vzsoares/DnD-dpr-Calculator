import Attack from "../packages/data/DPRCalculator";

export type dice = {
  id: number;
  minRoll: number;
  reRoll: number;
  sides: number;
};

export type attackResults = {
  damageFromBonus: number;
  damageFromCritFactor: number;
  damageFromDice: number;
  totalAttackDamage: number;
};

export interface SavedAttackData {
  id: number;
  damageFromBonus: number;
  damageFromCritFactor: number;
  damageFromDice: number;
  totalAttackDamage: number;
}

export interface AppStates {
  displayedAttackInfo: attackResults;
  currentAttackData: Attack | null;
  attacksList: [ClassStates, SavedAttackData][];
  editingIndex: number;
}

export interface Action {
  type: string;
  payload?: string | ClassStates;
  key?: string;
}

export interface ClassStates {
  name: string;
  damage_bonus: number;
  attack_bonus: number;
  damage_dice: dice[];
  crit_dice: dice[];
  advantage_modifier: 1 | 2 | 3;
  gwmsharp: boolean;
  crit_range: 20 | 19 | 18;
  target_AC: number;
}

import Attack from "../data/DPRCalculator";

type dice = { id: number; minRoll: number; reRoll: number; sides: number };

type attackResults = {
  damageFromBonus: number;
  damageFromCritFactor: number;
  damageFromDice: number;
  totalAttackDamage: number;
};

interface SavedAttackData {
  id: number;
  damageFromBonus: number;
  damageFromCritFactor: number;
  damageFromDice: number;
  totalAttackDamage: number;
}

interface ClassStates {
  name: string;
  damage_bonus: number;
  attack_bonus: number;
  crit_dice: dice[];
  damage_dice: dice[];
  advantage_modifier: 1 | 2 | 3;
  gwmsharp: boolean;
  crit_range: 20 | 19 | 18;
  target_AC: number;
}

interface AppStates {
  displayedAttackInfo: attackResults;
  currentAttackData: Attack | null;
  attacksList: [ClassStates, SavedAttackData][];
  editingIndex: number;
}

interface State {
  class: ClassStates;
  app: AppStates;
}

interface Action {
  type: string;
  payload?: string;
  key?: string;
}

export const initialState: State = {
  class: {
    name: "",
    damage_bonus: 0,
    attack_bonus: 0,
    crit_dice: [],
    damage_dice: [],
    advantage_modifier: 1,
    gwmsharp: false,
    crit_range: 20,
    target_AC: 12,
  },
  app: {
    displayedAttackInfo: {
      damageFromBonus: 0,
      damageFromCritFactor: 0,
      damageFromDice: 0,
      totalAttackDamage: 0,
    },
    currentAttackData: null,
    attacksList: [],
    editingIndex: 0,
  },
};

export default function calculatorReducer(state: State, action: Action) {
  const { type, key, payload } = action;

  switch (type) {
    case "inputs":
      if (key)
        return {
          ...state,
          [key]: payload,
        };

    case "app":
      if (key)
        return {
          ...state,
          [key]: payload,
        };

    case "reset":
      return initialState;
    default:
      return state;
  }
}

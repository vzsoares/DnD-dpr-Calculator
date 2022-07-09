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

interface AppStates {
  displayedAttackInfo: attackResults;
  currentAttackData: Attack | null;
  attacksList: [ClassStates, SavedAttackData][];
  editingIndex: number;
}

interface State {}

interface Action {
  type: string;
  payload?: string;
  key?: string;
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

export const initialState: ClassStates = {
  name: "",
  damage_bonus: 0,
  attack_bonus: 0,
  crit_dice: [],
  damage_dice: [],
  advantage_modifier: 1,
  gwmsharp: false,
  crit_range: 20,
  target_AC: 12,
};

export default function inputsReducer(state: ClassStates, action: Action) {
  const { type, key, payload } = action;

  switch (type) {
    case "update":
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

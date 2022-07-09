import { Action, ClassStates } from "../types";

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

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";

import { ClassStates, attackResults, SavedAttackData } from "../types";

// @ts-ignore
import DPRCalculator, { p_hit } from "../data/DPRCalculator.ts";
// @ts-ignore
import inputsReducer, { initialState } from "./DPRCalculatorReducer.ts";

const calculatorContext = createContext({});

function CalculatorContextProvider({ children }) {
  const [inputsState, dispatchInputs] = useReducer(inputsReducer, initialState);

  // other vars
  const [displayedAttackInfo, setDisplayedAttackInfo] = useState();
  const [currentAttackData, setCurrentAttackData] = useState();
  const [attacksList, setAttacksList] = useState([]);
  const [editingIndex, setEditingIndex] = useState("");
  //effects

  useEffect(() => {
    setCurrentAttackData(
      new DPRCalculator(
        inputsState.name,
        inputsState.attack_bonus,
        inputsState.damage_bonus,
        inputsState.damage_dice,
        inputsState.crit_dice,
        inputsState.advantage_modifier,
        inputsState.gwmsharp,
        inputsState.crit_range,
        inputsState.target_AC
      )
    );
  }, [inputsState]);

  useEffect(() => {
    setDisplayedAttackInfo({
      chanceToHit: currentAttackData?.p_hit(),
      chanceToCrit: currentAttackData?.p_crit(),
      dpt: {
        dice: currentAttackData?.getDiceDPR().toFixed(2),
        bonus: currentAttackData?.getDmgBonusDPR().toFixed(2),
        critFactor: currentAttackData?.getAverageCritFactorDMG().toFixed(2),
        total: currentAttackData?.getDPR().toFixed(2),
      },
      nHit: {
        dice: currentAttackData?.getAverageDiceDMG().toFixed(2),
        bonus: currentAttackData?.getEffectiveDamageBonus().toFixed(2),
        total: currentAttackData?.getAverageDMG().toFixed(2),
      },
      cHit: {
        dice: currentAttackData?.getAverageCritDiceDMG().toFixed(2),
        bonus: currentAttackData?.getEffectiveDamageBonus().toFixed(2),
        total: currentAttackData?.getAverageCriticalDMG().toFixed(2),
      },
    });
  }, [currentAttackData]);

  //functions
  function clearDisplayedData() {
    dispatchInputs({
      type: "reset",
    });
  }

  function updateInput(payload: string, key: string) {
    dispatchInputs({
      type: "update",
      payload,
      key,
    });
  }

  const startEditingAttack = useCallback((attack: SavedAttackData) => {
    setEditingIndex(attack.id);

    Object.entries(attack).forEach((a) =>
      dispatchInputs({
        type: "update",
        payload: a[1],
        key: a[0],
      })
    );
  }, []);

  const saveAttack = useCallback(() => {
    if (editingIndex > 0) {
      // EDIT ATTACK
      setAttacksList(
        attacksList.map((e) => {
          if (e[0].id === editingIndex) {
            return [
              { ...e[0], ...currentAttackData },
              { ...displayedAttackInfo },
            ];
          } else return e;
        })
      );
      clearDisplayedData();
      setEditingIndex(0);
      return;
    }
    // SAVE NEW ATTACK
    setAttacksList([
      ...attacksList,
      [
        { ...currentAttackData, id: new Date().getTime() },
        { ...displayedAttackInfo },
      ],
    ]);
    clearDisplayedData();
  }, [attacksList, currentAttackData, displayedAttackInfo, editingIndex]);

  const deleteAttack = useCallback(
    (attackID) => {
      setAttacksList(attacksList.filter((e) => e[0].id !== attackID));
      clearDisplayedData();
      setEditingIndex(0);
    },
    [attacksList]
  );

  const contextData = useMemo(() => {
    return {
      attacksList,
      displayedAttackInfo,
      editingIndex,
      inputsState,
      updateInput,
      startEditingAttack,
      saveAttack,
      deleteAttack,
    };
  }, [
    attacksList,
    displayedAttackInfo,
    editingIndex,
    inputsState,
    saveAttack,
    startEditingAttack,
    deleteAttack,
  ]);
  return (
    <calculatorContext.Provider value={contextData}>
      {children}
    </calculatorContext.Provider>
  );
}

function useCalculatorContext() {
  return useContext(calculatorContext);
}

export { CalculatorContextProvider, useCalculatorContext };

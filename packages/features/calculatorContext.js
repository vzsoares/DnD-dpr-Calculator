import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import DPRCalculator from "../data/DPRCalculator.ts";

import inputsReducer, {
  initialState,
} from "../features/DPRCalculatorReducer.ts";

const calculatorContext = createContext({});
function CalculatorContextProvider({ children }) {
  //
  const [inputsState, dispatchInputs] = useReducer(inputsReducer, initialState);
  function updateInput(payload, key) {
    dispatchInputs({
      type: "update",
      payload,
      key,
    });
  }
  //
  // other vars
  const [displayedAttackInfo, setDisplayedAttackInfo] = useState({});
  const [currentAttackData, setCurrentAttackData] = useState();
  const [attacksList, setAttacksList] = useState([]);
  const [editingIndex, setEditingIndex] = useState("");
  //effects
  useEffect(() => {
    setCurrentAttackData(
      new DPRCalculator(
        inputsState.name,
        inputsState.damage_bonus,
        inputsState.attack_bonus,
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
      damageFromDice: currentAttackData?.getAverageFromDice().toFixed(2),
      damageFromBonus: currentAttackData?.getAverageFromBonus().toFixed(2),
      damageFromCritFactor: currentAttackData
        ?.getAverageFromCritFactor()
        .toFixed(2),
      totalAttackDamage: currentAttackData?.getAverageTotal().toFixed(2),
    });
  }, [currentAttackData]);

  //functions
  function clearDisplayedData() {
    dispatchInputs({
      type: "reset",
    });
  }

  const startEditingAttack = useCallback((attack) => {
    setEditingIndex(attack.id);

    setAdvantageModifier(attack.advantage_modifier);
    setAttackBonus(attack.attack_bonus);
    setCritDiceList(attack.crit_dice);
    setCritRange(attack.crit_range);
    setDamageBonus(attack.damage_bonus);
    setDamageDiceList(attack.damage_dice);
    setGwmsharp(attack.gwmsharp);
    setName(attack.name);
    setTargetAC(attack.target_AC);

    dispatchInputs({
      type: "update",
      payload,
      key,
    });
  }, []);

  const saveAttack = useCallback(() => {
    if (editingIndex > 0) {
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
      startEditingAttack,
      saveAttack,
      editingIndex,
      deleteAttack,
      inputsState,
      updateInput,
    };
  }, [
    displayedAttackInfo,
    saveAttack,
    attacksList,
    startEditingAttack,
    editingIndex,
    deleteAttack,
    inputsState,
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

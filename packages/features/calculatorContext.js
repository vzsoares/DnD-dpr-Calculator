import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import DPRCalculator from "../data/DPRCalculator.ts";

const calculatorContext = createContext({});
function CalculatorContextProvider({ children }) {
  // class essential vars
  const [name, setName] = useState("");
  const [attackBonus, setAttackBonus] = useState(0);
  const [damageBonus, setDamageBonus] = useState(0);
  const [damageDiceList, setDamageDiceList] = useState([]);
  const [critDiceList, setCritDiceList] = useState([]);
  const [advantageModifier, setAdvantageModifier] = useState("Normal");
  const [gwmsharp, setGwmsharp] = useState(false);
  const [critRange, setCritRange] = useState("20-20");
  const [targetAC, setTargetAC] = useState(12);
  // other vars
  const [displayedAttackInfo, setDisplayedAttackInfo] = useState({});
  const [currentAttackData, setCurrentAttackData] = useState();
  const [attacksList, setAttacksList] = useState([]);
  const [editingIndex, setEditingIndex] = useState("");

  //effects
  useEffect(() => {
    setCurrentAttackData(
      new DPRCalculator(
        name,
        Number(attackBonus),
        Number(damageBonus),
        damageDiceList,
        critDiceList,
        advantageModifier === "Normal"
          ? 1
          : advantageModifier === "Advantage"
          ? 2
          : typeof advantageModifier === "number"
          ? advantageModifier
          : 3,
        gwmsharp,
        critRange === "20-20"
          ? 20
          : critRange === "19-20"
          ? 19
          : typeof critRange === "number"
          ? critRange
          : 18,
        targetAC
      )
    );
  }, [
    attackBonus,
    damageBonus,
    damageDiceList,
    critDiceList,
    advantageModifier,
    gwmsharp,
    critRange,
    targetAC,
    name,
  ]);

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
    setName("");
    setAttackBonus(0);
    setDamageBonus(0);
    setDamageDiceList([]);
    setCritDiceList([]);
    setAdvantageModifier("Normal");
    setGwmsharp(false);
    setCritRange("20-20");
    setTargetAC(12);
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
      attackBonus,
      setAttackBonus,
      gwmsharp,
      setGwmsharp,
      damageBonus,
      setDamageBonus,
      critDiceList,
      setCritDiceList,
      critRange,
      setCritRange,
      name,
      setName,
      damageDiceList,
      setDamageDiceList,
      targetAC,
      setTargetAC,
      advantageModifier,
      attacksList,
      setAdvantageModifier,
      displayedAttackInfo,
      startEditingAttack,
      saveAttack,
      editingIndex,
      deleteAttack,
    };
  }, [
    attackBonus,
    gwmsharp,
    displayedAttackInfo,
    damageBonus,
    critDiceList,
    critRange,
    name,
    damageDiceList,
    targetAC,
    advantageModifier,
    saveAttack,
    attacksList,
    startEditingAttack,
    editingIndex,
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

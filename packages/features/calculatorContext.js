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
  const [attackBonus, setAttackBonus] = useState(1);
  const [damageBonus, setDamageBonus] = useState(1);
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
  //effects
  useEffect(() => {
    setCurrentAttackData(
      new DPRCalculator(
        name,
        attackBonus,
        damageBonus,
        damageDiceList,
        critDiceList,
        advantageModifier === "Normal"
          ? 1
          : advantageModifier === "Advantage"
          ? 2
          : 3,
        gwmsharp,
        critRange === "20-20" ? 20 : critRange === "20-19" ? 19 : 18,
        targetAC
      )
    );

    setDisplayedAttackInfo({
      damageFromDice: currentAttackData?.getAverageFromDice(),
      damageFromBonus: currentAttackData?.getAverageFromBonus(),
      damageFromCritFactor: currentAttackData?.getAverageFromCritFactor(),
      totalAttackDamage: currentAttackData?.getAverageTotal(),
    });
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
    currentAttackData,
  ]);

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

  const saveAttack = useCallback(() => {
    setAttacksList([
      ...attacksList,
      { ...currentAttackData, id: new Date().getTime() },
    ]);
    clearDisplayedData();
  }, [attacksList, currentAttackData]);
  //

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
      setAdvantageModifier,
      displayedAttackInfo,
      saveAttack,
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

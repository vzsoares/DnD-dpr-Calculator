import { createContext, useContext, useMemo, useState } from "react";
import DPRCalculator from "../data/DPRCalculator.ts";

const calculatorContext = createContext({});
function CalculatorContextProvider({ children }) {
  //
  const [name, setName] = useState("");
  const [attackBonus, setAttackBonus] = useState(1);
  const [damageBonus, setDamageBonus] = useState(1);
  const [damageDiceList, setDamageDiceList] = useState([]);
  const [critDiceList, setCritDiceList] = useState([]);
  const [advantageModifier, setAdvantageModifier] = useState("Normal");
  const [gwmsharp, setGwmsharp] = useState(false);
  const [critRange, setCritRange] = useState("20-20");
  const [targetAC, setTargetAC] = useState(12);
  //

  //
  const singleAttack = new DPRCalculator(
    name,
    attackBonus,
    damageBonus,
    damageDiceList,
    critDiceList,
    1,
    gwmsharp,
    20,
    targetAC
  );
  function SaveAttack() {
    console.log(singleAttack.getAverageTotal());
  }
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
      SaveAttack,
    };
  }, [
    attackBonus,
    gwmsharp,
    damageBonus,
    critDiceList,
    critRange,
    name,
    damageDiceList,
    targetAC,
    advantageModifier,
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

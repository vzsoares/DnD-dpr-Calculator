import { createContext, useContext, useMemo, useState } from "react";
// import Attack from "../data/Attack";

const calculatorContext = createContext({});
function CalculatorContextProvider({ children }) {
  //
  const [attackBonus, setAttackBonus] = useState(1);
  const [damageBonus, setDamageBonus] = useState(1);
  const [gwmsharp, setGwmsharp] = useState(false);
  const [critRange, setCritRange] = useState("20-20");
  const [advantageModifier, setAdvantageModifier] = useState("Normal");
  const [targetAC, setTargetAC] = useState(12);
  const [damageDiceList, setDamageDiceList] = useState([]);
  const [critDiceList, setCritDiceList] = useState("");
  const [name, setName] = useState("");
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

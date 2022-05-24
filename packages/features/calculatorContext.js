import { createContext, useContext, useMemo, useState } from "react";
// import Attack from "../data/Attack";

const calculatorContext = createContext();
function CalculatorContextProvider({ children }) {
  //
  const [attackBonus, setAttackBonus] = useState("");
  const [damageBonus, setDamageBonus] = useState("");
  const [gwmsharp, setGwmsharp] = useState(false);
  const [critDice, setCritDice] = useState("");
  const [advantageModifier, setAdvantageModifier] = useState("");
  const [targetAC, setTargetAC] = useState("");
  const [name, setName] = useState("");
  const [damageDice, setDamageDice] = useState([]);
  const [critRange, setCritRange] = useState("");
  //
  const contextData = useMemo(() => {
    return {
      attackBonus,
      gwmsharp,
      damageBonus,
      critDice,
      setGwmsharp,
      targetAC,
      advantageModifier,
      setTargetAC,
      setAdvantageModifier,
      setCritDice,
      setAttackBonus,
      setDamageBonus,
    };
  }, [
    attackBonus,
    gwmsharp,
    damageBonus,
    targetAC,
    setGwmsharp,
    critDice,
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

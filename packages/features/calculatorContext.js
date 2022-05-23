import { createContext, useContext, useMemo, useState } from "react";
import Attack from "../data/Attack";

const calculatorContext = createContext();
function CalculatorContextProvider({ children }) {
  //
  const [attackBonus, setAttackBonus] = useState("");
  const [damageBonus, setDamageBonus] = useState("");
  const [gwmsharp, setGwmsharp] = useState(false);
  const [name, setName] = useState("");
  const [damageDice, setDamageDice] = useState("");
  const [critDice, setCritDice] = useState("");
  const [advantageModifier, setAdvantageModifier] = useState("");
  const [critRange, setCritRange] = useState("");
  const [targetAC, setTargetAC] = useState("");
  //
  const contextData = useMemo(() => {
    return {
      attackBonus,
      gwmsharp,
      damageBonus,
      setGwmsharp,
      setAttackBonus,
      setDamageBonus,
    };
  }, [attackBonus, gwmsharp, damageBonus]);
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

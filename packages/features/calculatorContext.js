import { createContext, useContext, useMemo, useState } from "react";

const calculatorContext = createContext();

function CalculatorContextProvider({ children }) {
  const [test, setTest] = useState("TEST");
  const contextData = useMemo(() => {
    return { test };
  }, []);
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

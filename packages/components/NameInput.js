// @ts-nocheck
import { Input } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.tsx";

export default function NameInput() {
  const { updateInput, inputsState } = useCalculatorContext();
  return (
    <>
      <Input
        borderColor='#222'
        maxW='400px'
        placeholder='Attack Name'
        value={inputsState.name}
        onChange={(e) => updateInput(e.target.value, "name")}
      />
    </>
  );
}

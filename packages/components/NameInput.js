// @ts-nocheck
import { Input } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function NameInput() {
  const { name, setName } = useCalculatorContext();
  return (
    <>
      <Input
        placeholder='Attack Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}

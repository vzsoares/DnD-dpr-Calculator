// @ts-nocheck
import SelectionInput from "../components/SelectionInput";
import { Flex } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function AdvancedOptionsSection() {
  const { critDice, setCritDice, advantageModifier, setAdvantageModifier } =
    useCalculatorContext();
  return (
    <Flex gap='5'>
      <SelectionInput
        props={{
          values: ["20-20", "19-20", "18-20"],
          title: "Crit Range",
          value: critDice,
          setValue: setCritDice,
        }}
      />
      <SelectionInput
        props={{
          values: ["Normal", "Advantage", "Elven accuracy"],
          title: "Advantage Modifier",
          value: advantageModifier,
          setValue: setAdvantageModifier,
        }}
      />
    </Flex>
  );
}

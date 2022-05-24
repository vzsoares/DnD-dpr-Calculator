// @ts-nocheck
import SelectionSelectInput from "../components/SelectionSelectInput";
import { Flex } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function AdvancedOptionsSection() {
  const { critDice, setCritDice, advantageModifier, setAdvantageModifier } =
    useCalculatorContext();
  return (
    <Flex gap='5'>
      <SelectionSelectInput
        props={{
          values: ["20-20", "19-20", "18-20"],
          title: "Crit Range",
          value: critDice,
          setValue: setCritDice,
        }}
      />
      <SelectionSelectInput
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

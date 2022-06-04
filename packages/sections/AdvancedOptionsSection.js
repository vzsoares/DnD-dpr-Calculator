// @ts-nocheck
import SelectInput from "../components/SelectInput";
import { Flex } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function AdvancedOptionsSection() {
  const { critRange, setCritRange, advantageModifier, setAdvantageModifier } =
    useCalculatorContext();
  return (
    <Flex gap='5'>
      <SelectInput
        props={{
          values: ["20-20", "19-20", "18-20"],
          title: "Crit Range",
          value: critRange,
          setValue: setCritRange,
        }}
      />
      <SelectInput
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

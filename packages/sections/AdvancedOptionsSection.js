// @ts-nocheck
import SelectInput from "../components/SelectInput";
import { Flex } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.tsx";

export default function AdvancedOptionsSection() {
  const { updateInput, inputsState } = useCalculatorContext();
  return (
    <Flex justifyContent={{ base: "space-around" }}>
      <SelectInput
        props={{
          title: "Crit Range",
          displayValues: ["20-20", "19-20", "18-20"],
          values: [20, 19, 18],
          key: "crit_range",
          updateInput,
          inputsState,
        }}
      />
      <SelectInput
        props={{
          title: "Advantage Modifier",
          displayValues: ["Normal", "Advantage", "Elven accuracy"],
          values: [1, 2, 3],
          key: "advantage_modifier",
          updateInput,
          inputsState,
        }}
      />
    </Flex>
  );
}

// @ts-nocheck
import { Box } from "@chakra-ui/react";
import NumberInputWithTitle from "../components/NumberInputWithTitle";
import { useCalculatorContext } from "../features/calculatorContext.tsx";

export default function ArmorSection() {
  const { inputsState, updateInput } = useCalculatorContext();

  return (
    <Box>
      <NumberInputWithTitle
        props={{
          roll: "Armor Class",
          value: inputsState.target_AC,
          setValue: updateInput,
          key: "target_AC",
          h: "100%",
        }}
      />
    </Box>
  );
}

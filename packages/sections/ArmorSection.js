// @ts-nocheck
import {
  Grid,
  GridItem,
  Heading,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function ArmorSection() {
  const { inputsState, updateInput } = useCalculatorContext();

  return (
    <Box>
      <Heading fontSize={"3rem"}> Armor Class</Heading>
      <NumberInput
        size={"lg"}
        maxW='468px'
        value={inputsState.target_AC}
        onChange={(e) => updateInput(Number(e), "target_AC")}
      >
        <NumberInputField fontSize={"2.5rem"} fontWeight='bold' />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}

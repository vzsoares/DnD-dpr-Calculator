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
  const { setTargetAC, targetAC } = useCalculatorContext();

  return (
    <Box>
      <Heading fontSize={"3rem"}> Armor Class</Heading>
      <NumberInput
        size={"lg"}
        maxW='468px'
        value={targetAC}
        onChange={(e) => setTargetAC(e)}
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

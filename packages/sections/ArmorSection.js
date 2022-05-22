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

export default function ArmorSection() {
  return (
    <Box>
      <Heading fontSize={"3rem"}> Armor Class</Heading>
      <NumberInput size={"lg"} maxW='468px'>
        <NumberInputField fontSize={"2.5rem"} fontWeight='bold' />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}

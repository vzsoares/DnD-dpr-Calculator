import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function HitBonusInput({ props: { roll } }) {
  return (
    <>
      <Box>
        <Heading fontSize={"1.5rem"}>{roll}</Heading>
        <NumberInput maxW='90px'>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </>
  );
}

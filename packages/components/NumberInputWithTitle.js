import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function HitBonusInput({ props: { roll, value, setValue } }) {
  return (
    <>
      <Box>
        <Heading fontSize={"1.5rem"}>{roll}</Heading>
        <NumberInput maxW='90px' value={value} onChange={(e) => setValue(e)}>
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

// @ts-nocheck
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function NumberInputWithTitle({
  props: {
    roll,
    value,
    setValue,
    justify,
    size,
    flexDir = "column",
    font = "1.5rem",
  },
}) {
  return (
    <>
      <Flex flexDir={flexDir} justify={justify}>
        <Heading fontSize={font}>{roll}</Heading>
        <NumberInput
          maxW='90px'
          value={value}
          onChange={(e) => setValue(e)}
          size={size}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </>
  );
}

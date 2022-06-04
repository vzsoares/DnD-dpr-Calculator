// @ts-nocheck
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function NumberInputWithTitle({
  props: { roll, value, setValue, flexDir, justify, font, size },
}) {
  return (
    <>
      <Flex flexDir={flexDir || "column"} justify={justify}>
        <Heading fontSize={font || "1.5rem"}>{roll}</Heading>
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

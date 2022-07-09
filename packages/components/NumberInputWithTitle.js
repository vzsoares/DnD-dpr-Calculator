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
    key,
    flexDir = "column",
    font = "1.5rem",
    disabled = false,
  },
}) {
  return (
    <>
      <Flex flexDir={{ base: "column", md: flexDir }} justify={justify}>
        <Heading fontSize={font}>{roll}</Heading>
        <NumberInput
          isDisabled={disabled}
          maxW='90px'
          value={value}
          onChange={(e) => setValue(Number(e), key)}
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

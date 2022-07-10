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
    justify = "space-between",
    size,
    key,
    flexDir = "column",
    font = "1.0rem",
    disabled = false,
  },
}) {
  return (
    <Flex
      flexDir={{ base: "column", md: flexDir }}
      justify={justify}
      width='min'
    >
      <Heading fontSize={font}>{roll}</Heading>
      <NumberInput
        isDisabled={disabled}
        maxW='90px'
        value={value}
        onChange={(e) => setValue(Number(e), key)}
        size={size}
        w='max'
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
}

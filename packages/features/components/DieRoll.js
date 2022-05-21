import {
  Box,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
export default function DieRoll({ props: { value } }) {
  return (
    <Box w='80px'>
      <Select defaultValue={value}>
        <option value='4'>d4</option>
        <option value='6'>d6</option>
        <option value='8'>d8</option>
        <option value='10'>d10</option>
        <option value='12'>d12</option>
      </Select>
      <NumberInput>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}

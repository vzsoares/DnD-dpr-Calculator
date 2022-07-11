// @ts-nocheck
import { Select, Box, Heading } from "@chakra-ui/react";
export default function SelectionSelectInput({
  props: { displayValues, values, title, updateInput, key, inputsState },
}) {
  return (
    <Box maxW='200px'>
      <Heading fontSize={"1rem"}>{title}</Heading>
      <Select
        borderColor='#222'
        value={`${inputsState[key]}`}
        onChange={(e) => updateInput(Number(e.target.value), key)}
      >
        {displayValues.map((e, i) => {
          return (
            <option value={`${values[i]}`} key={e}>
              {e}
            </option>
          );
        })}
      </Select>
    </Box>
  );
}

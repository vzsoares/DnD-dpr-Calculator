// @ts-nocheck
import { Select, Box, Heading } from "@chakra-ui/react";
export default function SelectionSelectInput({
  props: { values, title, value, setValue },
}) {
  return (
    <Box maxW='150px'>
      <Heading fontSize={"1rem"}>{title}</Heading>
      <Select value={value} onChange={(e) => setValue(e.target.value)}>
        {values.map((e) => {
          return (
            <option values={e} key={e}>
              {e}
            </option>
          );
        })}
      </Select>
    </Box>
  );
}

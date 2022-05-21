import { Select, Box, Heading } from "@chakra-ui/react";
export default function SelectionSelectInput({ props: { value, title } }) {
  return (
    <Box maxW='150px'>
      <Heading fontSize={"1rem"}>{title}</Heading>
      <Select>
        {value.map((e) => {
          return (
            <option value={e} key={e}>
              {e}
            </option>
          );
        })}
      </Select>
    </Box>
  );
}

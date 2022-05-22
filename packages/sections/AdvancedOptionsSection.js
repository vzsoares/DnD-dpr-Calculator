import SelectionSelectInput from "../components/SelectionSelectInput";
import { Flex } from "@chakra-ui/react";

export default function AdvancedOptionsSection() {
  return (
    <Flex gap='5'>
      <SelectionSelectInput
        props={{
          value: ["20-20", "19-20", "18-20"],
          title: "Crit Range",
        }}
      />
      <SelectionSelectInput
        props={{
          value: ["Normal", "Advantage", "Elven accuracy"],
          title: "Advantage Modifier",
        }}
      />
    </Flex>
  );
}

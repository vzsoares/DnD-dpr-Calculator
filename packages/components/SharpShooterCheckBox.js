// @ts-nocheck
import { Checkbox, CheckboxGroup, Flex, Heading } from "@chakra-ui/react";
export default function SharpShooterCheckBox({
  props: { checked, setChecked, key },
}) {
  return (
    <Flex direction={"column"}>
      <Heading fontSize={"1.5rem"}>GWM/SHA</Heading>
      <Checkbox
        isChecked={checked}
        onChange={(e) => setChecked(e.target.checked, key)}
        justifyContent='center'
        size='lg'
      />
    </Flex>
  );
}

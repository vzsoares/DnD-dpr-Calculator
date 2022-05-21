// @ts-nocheck
import { Checkbox, CheckboxGroup, Flex, Heading } from "@chakra-ui/react";
export default function SharpShooterCheckBox({ props: { checked } }) {
  return (
    <Flex direction={"column"}>
      <Heading fontSize={"1.5rem"}>GWM/SHA</Heading>
      <Checkbox isChecked={checked} justifyContent='center' size='lg' />
    </Flex>
  );
}

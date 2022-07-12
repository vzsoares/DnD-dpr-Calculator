// @ts-nocheck
import { Box, Checkbox, CheckboxGroup, Flex, Heading } from "@chakra-ui/react";
export default function SharpShooterCheckBox({
  props: { checked, setChecked, key },
}) {
  return (
    <Flex direction={"column"} width='min' justifyContent='space-between'>
      <Heading fontSize={"1.0rem"}>Great Weapon Master / Sharpshooter</Heading>
      <Flex h='40px'>
        <Checkbox
          colorScheme='yellow'
          isChecked={checked}
          onChange={(e) => setChecked(e.target.checked, key)}
          justifyContent='center'
          borderColor='#222'
          size='lg'
          margin='0 auto'
        />
      </Flex>
    </Flex>
  );
}

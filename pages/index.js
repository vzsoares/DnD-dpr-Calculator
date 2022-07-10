import DieSection from "../packages/sections/DieSection";
import HitDamageSection from "../packages/sections/HitDamageSection";
import AdvancedOptionsSection from "../packages/sections/AdvancedOptionsSection";
// @ts-ignore
import ArmorSection from "../packages/sections/ArmorSection";
import SaveAttackBtn from "../packages/components/SaveAttackBtn";
import AttacksDataSection from "../packages/sections/AttacksDataSection";
import AttacksListSection from "../packages/sections/AttacksListSection";
import NameInput from "../packages/components/NameInput";
import { Box, Flex } from "@chakra-ui/react";
export default function Home() {
  return (
    <Box maxW='998px' margin='0 auto'>
      <Flex gap='1' flexDir={{ base: "column", md: "row" }}>
        <Box maxW='330px' margin='0 auto'>
          <HitDamageSection />
          <AdvancedOptionsSection />
          <Flex justifyContent='space-evenly' gap='1' marginY='1rem'>
            <ArmorSection />
            <Flex
              w='min-intrinsic'
              flexDir='column'
              justifyContent='space-between'
            >
              <NameInput />
              <SaveAttackBtn />
            </Flex>
          </Flex>
        </Box>
        <Box w='100%' margin='0 auto'>
          <DieSection />
        </Box>
      </Flex>
      <br />
      <AttacksDataSection />
      <AttacksListSection />
    </Box>
  );
}

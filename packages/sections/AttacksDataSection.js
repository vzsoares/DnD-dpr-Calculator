import { Heading, Box, Flex } from "@chakra-ui/react";
import TotalAttacksTable from "../components/TotalAttacksTable";
import CurrentAttackTable from "../components/CurrentAttackTable";
import { useCalculatorContext } from "../features/calculatorContext.tsx";

export default function AttackSection() {
  const { displayedAttackInfo, attacksList } = useCalculatorContext();
  // TOTALS
  const numberOfAttacks = attacksList.length;

  const totalAttackDamage = attacksList.reduce((e, a) => {
    return e + Number(a[1].dpt.total);
  }, 0);

  return (
    <Flex mb='1rem' gap='2' flexWrap='wrap' justifyContent='space-evenly'>
      <Flex maxW='468px' flexDir='column' justifyContent='flex-start' w='100%'>
        <Heading mb='0.5rem'>Current Attack info</Heading>
        <CurrentAttackTable
          props={{
            displayedAttackInfo,
          }}
        />
      </Flex>
      <Flex maxW='468px' flexDir='column' justifyContent='flex-start' w='100%'>
        <Heading mb='0.5rem'>Total Attacks info</Heading>
        <TotalAttacksTable
          props={{
            value: {
              totalAttackDamage,
              numberOfAttacks,
            },
          }}
        />
      </Flex>
    </Flex>
  );
}

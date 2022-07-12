import { Heading, Box, Flex } from "@chakra-ui/react";
import AttackInfoTable from "../components/AttackInfoTable";
import { useCalculatorContext } from "../features/calculatorContext.tsx";

export default function AttackSection() {
  const { displayedAttackInfo, attacksList } = useCalculatorContext();
  // TOTALS
  const numberOfAttacks = attacksList.length;
  const damageFromDice = attacksList.reduce((e, a) => {
    return e + Number(a[1].damageFromDice);
  }, 0);
  const damageFromBonus = attacksList.reduce((e, a) => {
    return e + Number(a[1].damageFromBonus);
  }, 0);
  const damageFromCritFactor = attacksList.reduce((e, a) => {
    return e + Number(a[1].damageFromCritFactor);
  }, 0);
  const totalAttackDamage = attacksList.reduce((e, a) => {
    return e + Number(a[1].totalAttackDamage);
  }, 0);

  return (
    <Flex mb='1rem' gap='2' flexWrap='wrap' justifyContent='space-evenly'>
      <Flex maxW='468px' flexDir='column' justifyContent='space-between'>
        <Heading>Current Attack Damage</Heading>
        <AttackInfoTable
          props={{
            value: [
              displayedAttackInfo?.damageFromDice,
              displayedAttackInfo?.damageFromBonus,
              displayedAttackInfo?.damageFromCritFactor,
              displayedAttackInfo?.totalAttackDamage,
            ],
            lines: "",
          }}
        />
      </Flex>
      <Flex maxW='468px' flexDir='column' justifyContent='space-between'>
        <Heading>Total Turn Damage</Heading>
        <AttackInfoTable
          props={{
            value: [
              damageFromDice,
              damageFromBonus,
              damageFromCritFactor,
              totalAttackDamage,
              numberOfAttacks,
            ],
            lines: "Number of Attacks",
          }}
        />
      </Flex>
    </Flex>
  );
}

import { Heading, Box } from "@chakra-ui/react";
import AttackInfoTable from "../components/AttackInfoTable";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function AttackSection() {
  const { displayedAttackInfo } = useCalculatorContext();
  return (
    <Box maxW='468px'>
      <Heading>Current Attack info</Heading>
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
      <br />
      <Heading>Total Attacks info</Heading>
      <AttackInfoTable
        props={{
          value: ["1", "2", "3", "4", "5", "6"],
          lines: "Number of Attacks",
        }}
      />
    </Box>
  );
}

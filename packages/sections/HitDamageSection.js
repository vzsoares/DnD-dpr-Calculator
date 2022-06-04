// @ts-nocheck
import { useCalculatorContext } from "../features/calculatorContext.js";
import NumberInputWithTitle from "../components/NumberInputWithTitle";
import SharpShooterCheckBox from "../components/SharpShooterCheckBox";
import { Flex } from "@chakra-ui/react";
export default function HitDamageSection() {
  const {
    attackBonus,
    setAttackBonus,
    damageBonus,
    setDamageBonus,
    gwmsharp,
    setGwmsharp,
  } = useCalculatorContext();
  return (
    <Flex
      display='flex'
      gap={{ sm: "5", lg: "10" }}
      direction={{ base: "column", sm: "row", md: "row", lg: "row" }}
    >
      <NumberInputWithTitle
        props={{ roll: "HIT/DC", value: attackBonus, setValue: setAttackBonus }}
      />
      <NumberInputWithTitle
        props={{
          roll: "Damage Dice",
          value: damageBonus,
          setValue: setDamageBonus,
        }}
      />
      <SharpShooterCheckBox
        props={{ checked: gwmsharp, setChecked: setGwmsharp }}
      />
    </Flex>
  );
}

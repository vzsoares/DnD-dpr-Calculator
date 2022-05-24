import { useCalculatorContext } from "../features/calculatorContext.js";
import HitBonusInput from "../components/HitBonusInput";
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
      <HitBonusInput
        props={{ roll: "HIT/DC", value: attackBonus, setValue: setAttackBonus }}
      />
      <HitBonusInput
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

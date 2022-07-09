// @ts-nocheck
import { useCalculatorContext } from "../features/calculatorContext.js";
import NumberInputWithTitle from "../components/NumberInputWithTitle";
import SharpShooterCheckBox from "../components/SharpShooterCheckBox";
import { Flex } from "@chakra-ui/react";
export default function HitDamageSection() {
  const { inputsState, updateInput } = useCalculatorContext();
  return (
    <Flex
      display='flex'
      gap={{ sm: "5", lg: "10" }}
      direction={{ base: "column", sm: "row", md: "row", lg: "row" }}
    >
      <NumberInputWithTitle
        props={{
          roll: "HIT/DC",
          value: inputsState.attack_bonus,
          setValue: updateInput,
          key: "attack_bonus",
        }}
      />
      <NumberInputWithTitle
        props={{
          roll: "Damage Bonus",
          value: inputsState.damage_bonus,
          setValue: updateInput,
          key: "damage_bonus",
        }}
      />
      <SharpShooterCheckBox
        props={{
          checked: inputsState.gwmsharp,
          setChecked: updateInput,
          key: "gwmsharp",
        }}
      />
    </Flex>
  );
}

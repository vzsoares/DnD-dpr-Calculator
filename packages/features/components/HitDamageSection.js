import HitBonusInput from "./HitBonusInput";
import SharpShooterCheckBox from "./SharpShooterCheckBox";
import { Flex } from "@chakra-ui/react";
export default function HitDamageSection() {
  return (
    <Flex
      display='flex'
      gap={{ sm: "5", lg: "10" }}
      direction={{ base: "column", sm: "row", md: "row", lg: "row" }}
    >
      <HitBonusInput props={{ roll: "HIT/DC" }} />
      <HitBonusInput props={{ roll: "Damage Dice" }} />
      <SharpShooterCheckBox props={{ checked: false }} />
    </Flex>
  );
}

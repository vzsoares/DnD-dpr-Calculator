import { useCalculatorContext } from "../packages/features/calculatorContext";
import DieSection from "../packages/sections/DieSection";
import HitDamageSection from "../packages/sections/HitDamageSection";
import AdvancedOptionsSection from "../packages/sections/AdvancedOptionsSection";
// @ts-ignore
import ArmorSection from "../packages/sections/ArmorSection";
import SaveAttackBtn from "../packages/components/SaveAttackBtn";
import CurrentAttackSection from "../packages/sections/AttackSection";
import AttacksListSection from "../packages/sections/AttacksListSection";
export default function Home() {
  const { test } = useCalculatorContext();
  return (
    <>
      <HitDamageSection />
      <AdvancedOptionsSection />
      <DieSection />
      <ArmorSection />
      <br />
      <SaveAttackBtn />
      <CurrentAttackSection />
      <AttacksListSection />
      {/* TODO modal,Name */}
    </>
  );
}

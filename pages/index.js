import { useCalculatorContext } from "../packages/features/calculatorContext";
import DieSection from "../packages/features/components/DieSection";
import HitDamageSection from "../packages/features/components/HitDamageSection";
import AdvancedOptionsSection from "../packages/features/components/AdvancedOptionsSection";
import ArmorSection from "../packages/features/components/ArmorSection";
import SaveAtackBtn from "../packages/features/components/SaveAtackBtn";
import CurrentAttackSection from "../packages/features/components/AttackSection";
import AttacksListSection from "../packages/features/components/AttacksListSection";
export default function Home() {
  const { test } = useCalculatorContext();
  return (
    <>
      <HitDamageSection />
      <AdvancedOptionsSection />
      <DieSection />
      <ArmorSection />
      <br />
      <SaveAtackBtn />
      <CurrentAttackSection />
      <AttacksListSection />
    </>
  );
}

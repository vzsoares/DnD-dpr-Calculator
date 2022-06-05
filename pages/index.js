import { useCalculatorContext } from "../packages/features/calculatorContext";
import DieSection from "../packages/sections/DieSection";
import HitDamageSection from "../packages/sections/HitDamageSection";
import AdvancedOptionsSection from "../packages/sections/AdvancedOptionsSection";
// @ts-ignore
import ArmorSection from "../packages/sections/ArmorSection";
import SaveAttackBtn from "../packages/components/SaveAttackBtn";
import AttacksDataSection from "../packages/sections/AttacksDataSection";
import AttacksListSection from "../packages/sections/AttacksListSection";
import NameInput from "../packages/components/NameInput";
export default function Home() {
  return (
    <>
      <HitDamageSection />
      <AdvancedOptionsSection />
      <DieSection />
      <ArmorSection />
      <br />
      <NameInput />
      <SaveAttackBtn />
      <AttacksDataSection />
      <AttacksListSection />
    </>
  );
}

import { useCalculatorContext } from "../packages/features/calculatorContext";
import DieSection from "../packages/features/components/DieSection";
export default function Home() {
  const { test } = useCalculatorContext();
  return (
    <>
      <DieSection />
    </>
  );
}

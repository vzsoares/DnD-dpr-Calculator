import { useCalculatorContext } from "../packages/features/calculatorContext";
export default function Home() {
  const { test } = useCalculatorContext();
  return (
    <>
      <div>hello world</div>
      <div>{test}</div>
    </>
  );
}

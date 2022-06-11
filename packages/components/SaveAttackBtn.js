import { Button, ButtonGroup } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";
export default function SaveAtackBtn() {
  const { SaveAttack } = useCalculatorContext();
  return (
    <>
      <Button onClick={() => SaveAttack()}>Save Attack</Button>
    </>
  );
}

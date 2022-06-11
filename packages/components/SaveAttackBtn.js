import { Button, ButtonGroup } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";
export default function SaveAtackBtn() {
  const { saveAttack } = useCalculatorContext();
  return (
    <>
      <Button onClick={() => saveAttack()}>Save Attack</Button>
    </>
  );
}

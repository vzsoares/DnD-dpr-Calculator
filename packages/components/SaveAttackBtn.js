import { Button, ButtonGroup } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.tsx";
export default function SaveAtackBtn() {
  const { saveAttack, editingIndex } = useCalculatorContext();
  return (
    <>
      <Button
        onClick={() => saveAttack()}
        colorScheme='blackAlpha'
        color='#222'
      >
        {editingIndex ? "Save Edit" : "Save Attack"}
      </Button>
    </>
  );
}

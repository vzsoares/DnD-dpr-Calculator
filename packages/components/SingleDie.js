import { Box } from "@chakra-ui/react";
import { Dice10, Dice12, Dice4, Dice6, Dice8, DiceN } from "../icons/Dices";
export default function SingleDie({ props: { value, func, color } }) {
  function handleClick(e) {
    e.preventDefault();
    func();
  }
  const icons = {
    0: DiceN,
    4: Dice4,
    6: Dice6,
    8: Dice8,
    10: Dice10,
    12: Dice12,
  };
  return (
    <Box h='40px' w='40px' bgColor={color || ""} borderRadius='15px'>
      <a
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => handleClick(e)}
      >
        {icons[value.sides ?? value]
          ? icons[value.sides ?? value]()
          : icons[0]()}
      </a>
    </Box>
  );
}

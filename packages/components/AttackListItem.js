import { Container, Flex, Button, Box } from "@chakra-ui/react";

export default function AttackItem({
  props: { e, startEditingAttack, editingIndex, deleteAttack },
}) {
  return (
    <Flex maxW='350px'>
      <Container>{e[0].name || "Nameless Attack"}</Container>
      <Box>
        {e[1].totalAttackDamage}{" "}
        <Button
          maxH={"20px"}
          onClick={() =>
            editingIndex === e[0].id
              ? deleteAttack(e[0].id)
              : startEditingAttack(e[0])
          }
        >
          {editingIndex === e[0].id ? "Delete" : "Edit"}
        </Button>
      </Box>
    </Flex>
  );
}

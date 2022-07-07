import { Grid, GridItem, Container, Flex, Button } from "@chakra-ui/react";

export default function AttackItem({ props }) {
  return (
    <Flex>
      <Container>{props.e[0].name || "Nameless attack"}</Container>
      <Container>
        {props.e[1].totalAttackDamage}{" "}
        <Button
          maxH={"20px"}
          onClick={() => props.startEditingAttack(props.e[0])}
        >
          View
        </Button>
      </Container>
    </Flex>
  );
}

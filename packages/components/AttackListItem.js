import { Grid, GridItem, Container, Flex, Button } from "@chakra-ui/react";

export default function AttackItem({ props }) {
  return (
    <Flex>
      <Container>{props[0].name || "nameless"}</Container>
      <Container>
        {props[1].totalAttackDamage} <Button maxH={"20px"}>View</Button>
      </Container>
    </Flex>
  );
}

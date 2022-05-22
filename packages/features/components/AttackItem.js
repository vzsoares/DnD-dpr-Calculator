import { Grid, GridItem, Container, Flex, Button } from "@chakra-ui/react";

export default function AttackItem({
  props: {
    data: { name, dpr },
  },
}) {
  return (
    <Flex>
      <Container>{name}</Container>
      <Container>
        {dpr} <Button maxH={"20px"}>View</Button>
      </Container>
    </Flex>
  );
}

// @ts-nocheck
import React from "react";
import { Grid, GridItem, Container, Flex } from "@chakra-ui/react";
import AttackItem from "./AttackItem";
export default function AttacksListSection() {
  const attackList = [
    { name: "attack 1", dpr: "9.5" },
    { name: "attack 2", dpr: "10.5" },
    { name: "attack 3", dpr: "11.5" },
  ];
  return (
    <Grid templateColumns='repeat(1, 1fr)' gap={6} maxW='678px'>
      {attackList.map((e, i) => {
        return <AttackItem props={{ data: e }} key={i} />;
      })}
    </Grid>
  );
}

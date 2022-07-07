// @ts-nocheck
import React from "react";
import { Grid, GridItem, Container, Flex } from "@chakra-ui/react";
import AttackListItem from "../components/AttackListItem";
import { useCalculatorContext } from "../features/calculatorContext";
export default function AttacksListSection() {
  const { attacksList, startEditingAttack } = useCalculatorContext();
  return (
    <Grid templateColumns='repeat(1, 1fr)' gap={6} maxW='678px'>
      {attacksList.map((e, i) => {
        return <AttackListItem props={{ e, startEditingAttack }} key={i} />;
      })}
    </Grid>
  );
}

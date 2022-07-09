// @ts-nocheck
import React from "react";
import { Grid, GridItem, Container, Flex } from "@chakra-ui/react";
import AttackListItem from "../components/AttackListItem";
import { useCalculatorContext } from "../features/calculatorContext.tsx";
export default function AttacksListSection() {
  const { attacksList, startEditingAttack, editingIndex, deleteAttack } =
    useCalculatorContext();
  return (
    <Grid templateColumns='repeat(1, 1fr)' gap={6} maxW='678px'>
      {attacksList.map((e, i) => {
        return (
          <AttackListItem
            props={{ e, startEditingAttack, editingIndex, deleteAttack }}
            key={i}
          />
        );
      })}
    </Grid>
  );
}

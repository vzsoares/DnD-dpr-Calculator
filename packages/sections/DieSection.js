// @ts-nocheck
import React, { useState } from "react";
import SingleDie from "../components/SingleDie";
import NumberInputWithTitle from "../components/NumberInputWithTitle";
import { Grid, Heading, Box, Flex, Switch } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function DieSection() {
  const { damageDiceList, setDamageDiceList } = useCalculatorContext();
  const [switchState, setSwitchState] = useState(false);
  const dieProperties = [
    { roll: "Sides", value: 1, setValue: () => {}, flexDir: "row" },
    { roll: "Reroll below", value: 1, setValue: () => {}, flexDir: "row" },
    { roll: "Minimum roll", value: 1, setValue: () => {}, flexDir: "row" },
  ];

  const dies = [4, 6, 8, 12];
  return (
    <>
      {/* TODO change layout */}
      <Grid
        templateAreas={`"a a a a d" "c c c c e" "c c c c e" "c c c c b"`}
        minW={"200px"}
        maxW={"998px"}
        minH={"200px"}
      >
        <Flex gridArea={"a"}>
          {dies.map((element, index) => {
            return (
              <SingleDie
                key={index}
                props={{
                  value: element,
                  func: () => setDamageDiceList([...damageDiceList, element]),
                }}
              />
            );
          })}
        </Flex>
        {/* switch */}
        <Box gridArea={"d"}>
          <Heading fontSize={"1rem"}>{switchState ? "Crit" : "Normal"}</Heading>
          <Switch
            size='lg'
            onChange={() => {
              setSwitchState(!switchState);
            }}
          />
        </Box>
        {/* Die properties */}
        <Flex gridArea={"e"} flexDir='column'>
          {dieProperties.map((element, i) => {
            return (
              <NumberInputWithTitle
                key={i}
                props={{
                  roll: element.roll,
                  value: element.value,
                  setValue: element.setValue,
                  flexDir: element.flexDir,
                  justify: "space-between",
                  font: "1rem",
                  size: "sm",
                }}
              />
            );
          })}
        </Flex>
        <Flex gridArea={"b"}>Save/Edit</Flex>
        <Box gridArea={"c"} mt='1'>
          <Grid
            templateColumns='repeat(6,1fr)'
            maxW='500px'
            maxH='500px'
            overflow='auto'
            justifyItems='center'
            gap='1'
          >
            {damageDiceList?.map((die, index) => {
              return (
                <SingleDie
                  key={index}
                  props={{
                    value: die,
                    // TODO func()
                  }}
                />
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

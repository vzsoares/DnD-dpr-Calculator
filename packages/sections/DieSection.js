// @ts-nocheck
import React, { useState, useEffect } from "react";
import SingleDie from "../components/SingleDie";
import NumberInputWithTitle from "../components/NumberInputWithTitle";
import { Grid, Heading, Box, Flex, Switch, Button } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function DieSection() {
  const { damageDiceList, setDamageDiceList, critDiceList, setCritDiceList } =
    useCalculatorContext();

  const [switchState, setSwitchState] = useState(false);
  const [displayedDiceList, setDisplayedDiceList] = useState(damageDiceList);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    setDisplayedDiceList(
      !switchState
        ? damageDiceList.sort((a, b) => a.sides - b.sides)
        : critDiceList.sort((a, b) => a.sides - b.sides)
    );
  }, [damageDiceList, critDiceList, switchState]);

  const dieProperties = [
    { roll: "Sides", value: 1, setValue: () => {}, flexDir: "row" },
    { roll: "Reroll below", value: 1, setValue: () => {}, flexDir: "row" },
    { roll: "Minimum roll", value: 1, setValue: () => {}, flexDir: "row" },
  ];

  const defaultDies = [4, 6, 8, 12];

  function getUniqueId() {
    return new Date().getTime();
  }
  return (
    <>
      <Grid
        templateAreas={`"a a a a d" "c c c c e" "c c c c e" "c c c c b"`}
        minW={"200px"}
        maxW={"998px"}
        minH={"200px"}
      >
        <Flex gridArea={"a"} gap='1'>
          {editingIndex === -1 ? (
            defaultDies.map((element, index) => {
              return (
                <SingleDie
                  key={index}
                  props={{
                    value: element,
                    func: () =>
                      !switchState
                        ? setDamageDiceList([
                            ...damageDiceList,
                            {
                              sides: element,
                              reroll: 1,
                              minRoll: 1,
                              id: getUniqueId(),
                            },
                          ])
                        : setCritDiceList([
                            ...critDiceList,
                            {
                              sides: element,
                              reroll: 1,
                              minRoll: 1,
                              id: getUniqueId(),
                            },
                          ]),
                  }}
                />
              );
            })
          ) : (
            <SingleDie
              props={{
                value: displayedDiceList[editingIndex],
                func: () => {},
                color: "#e6b517",
              }}
            />
          )}
        </Flex>
        {/* switch */}
        <Box gridArea={"d"}>
          <Heading fontSize={"1rem"}>{switchState ? "Crit" : "Normal"}</Heading>
          <Switch
            isDisabled={editingIndex !== -1 && true}
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
                  disabled: editingIndex === -1 && true,
                }}
              />
            );
          })}
        </Flex>
        {/* save/delete btn */}
        <Flex gridArea={"b"} flexDir='column' gap='1' p='1rem'>
          {/* TODO Btns */}
          <Button isDisabled={editingIndex === -1 && true}>Save</Button>
          <Button isDisabled={editingIndex === -1 && true}>Delete</Button>
        </Flex>
        {/* Dice Grid */}
        <Box gridArea={"c"} mt='1'>
          <Grid
            templateColumns={{ base: "repeat(3,1fr)", md: "repeat(6,1fr)" }}
            maxW='500px'
            maxH='500px'
            overflow='auto'
            justifyItems='center'
            gap='1'
          >
            {displayedDiceList?.map((die, index) => {
              return (
                <SingleDie
                  key={index}
                  props={{
                    value: die,
                    func: () => setEditingIndex(index),
                    color: editingIndex === index && "#e6b517",
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

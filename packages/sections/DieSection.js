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

  const [sides, setSides] = useState(1);
  const [reroll, setReroll] = useState(1);
  const [minRoll, setMinRoll] = useState(1);

  useEffect(() => {
    // setDisplayedDiceList(
    //   !switchState
    //     ? damageDiceList.sort((a, b) => a.sides - b.sides)
    //     : critDiceList.sort((a, b) => a.sides - b.sides)
    // );
    setDisplayedDiceList(!switchState ? damageDiceList : critDiceList);
  }, [damageDiceList, critDiceList, switchState]);

  const dieProperties = [
    {
      roll: "Sides",
      value: sides,
      setValue: (e) => setSides(e),
      flexDir: "row",
    },
    {
      roll: "Reroll below",
      value: reroll,
      setValue: (e) => setReroll(e),
      flexDir: "row",
    },
    {
      roll: "Minimum roll",
      value: minRoll,
      setValue: (e) => setMinRoll(e),
      flexDir: "row",
    },
  ];

  const defaultDies = [4, 6, 8, 10, 12];

  function getUniqueId() {
    return new Date().getTime();
  }

  function startEditing(index) {
    setEditingIndex(index);
    const objectID = displayedDiceList[index].id;
    setSides(displayedDiceList.find((e) => e.id === objectID)?.sides ?? 1);
    setReroll(displayedDiceList.find((e) => e.id === objectID)?.reroll ?? 1);
    setMinRoll(displayedDiceList.find((e) => e.id === objectID)?.minRoll ?? 1);
  }

  function saveDie() {
    const objectID = displayedDiceList[editingIndex].id;
    const saveLogic = (prevState) => {
      return prevState.map((element) => {
        if (element.id === objectID) {
          return {
            ...element,
            sides: sides,
            reroll: reroll,
            minRoll: minRoll,
          };
        }
        return element;
      });
    };
    if (!switchState) {
      setDamageDiceList(saveLogic(damageDiceList));
    } else if (switchState) {
      setCritDiceList(saveLogic(critDiceList));
    }
    setEditingIndex(-1);
  }

  function deleteDie() {
    const objectID = displayedDiceList[editingIndex].id;

    const saveLogic = (prevState) => {
      return prevState.filter((element) => element.id !== objectID);
    };

    if (!switchState) {
      setDamageDiceList(saveLogic(damageDiceList));
    } else if (switchState) {
      setCritDiceList(saveLogic(critDiceList));
    }
    setEditingIndex(-1);
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
          <Button
            onClick={() => saveDie()}
            isDisabled={editingIndex === -1 && true}
          >
            Save
          </Button>
          <Button
            onClick={() => deleteDie()}
            isDisabled={editingIndex === -1 && true}
          >
            Delete
          </Button>
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
                    func: () => startEditing(index),
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

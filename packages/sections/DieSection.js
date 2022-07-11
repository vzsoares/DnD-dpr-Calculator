// @ts-nocheck
import React, { useState, useEffect } from "react";
import SingleDie from "../components/SingleDie";
import NumberInputWithTitle from "../components/NumberInputWithTitle";
import { Grid, Heading, Box, Flex, Switch, Button } from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.tsx";

export default function DieSection() {
  const { updateInput, inputsState } = useCalculatorContext();

  const [switchState, setSwitchState] = useState(false);
  const [displayedDiceList, setDisplayedDiceList] = useState(
    inputsState.damage_dice
  );
  const [editingIndex, setEditingIndex] = useState(-1);

  const [sides, setSides] = useState(1);
  const [reroll, setReroll] = useState(1);
  const [minRoll, setMinRoll] = useState(1);

  useEffect(() => {
    // setDisplayedDiceList(
    //   !switchState
    //     ? inputsState.damage_dice.sort((a, b) => a.sides - b.sides)
    //     : inputsState.crit_dice.sort((a, b) => a.sides - b.sides)
    // );
    setDisplayedDiceList(
      !switchState ? inputsState.damage_dice : inputsState.crit_dice
    );
  }, [inputsState.damage_dice, inputsState.crit_dice, switchState]);

  const dieProperties = [
    {
      roll: "Sides",
      value: sides,
      setValue: (e) => setSides(e),
      flexDir: "row",
    },
    {
      roll: "Reroll Below",
      value: reroll,
      setValue: (e) => setReroll(e),
      flexDir: "row",
    },
    {
      roll: "Minimum Roll",
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
    setReroll(displayedDiceList.find((e) => e.id === objectID)?.reroll ?? 0);
    setMinRoll(displayedDiceList.find((e) => e.id === objectID)?.minRoll ?? 1);
  }

  function saveDie() {
    const objectID = displayedDiceList[editingIndex].id;
    const saveLogic = (prevState) => {
      return prevState.map((element) => {
        if (element.id === objectID) {
          return {
            ...element,
            sides: Number(sides),
            reroll: Number(reroll),
            minRoll: Number(minRoll),
          };
        }
        return element;
      });
    };
    if (!switchState) {
      updateInput(saveLogic(inputsState.damage_dice), "damage_dice");
    } else if (switchState) {
      updateInput(saveLogic(inputsState.crit_dice), "crit_dice");
    }
    setEditingIndex(-1);
  }

  function deleteDie() {
    const objectID = displayedDiceList[editingIndex].id;

    const saveLogic = (prevState) => {
      return prevState.filter((element) => element.id !== objectID);
    };

    if (!switchState) {
      updateInput(saveLogic(inputsState.damage_dice), "damage_dice");
    } else if (switchState) {
      updateInput(saveLogic(inputsState.crit_dice), "crit_dice");
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
        padding='0.5rem'
        shadow='md'
        height='100%'
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
                        ? updateInput(
                            [
                              ...inputsState.damage_dice,
                              {
                                sides: element,
                                reroll: 0,
                                minRoll: 1,
                                id: getUniqueId(),
                              },
                            ],
                            "damage_dice"
                          )
                        : updateInput(
                            [
                              ...inputsState.crit_dice,
                              {
                                sides: element,
                                reroll: 0,
                                minRoll: 1,
                                id: getUniqueId(),
                              },
                            ],
                            "crit_dice"
                          ),
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
        <Flex flexDir='column' gridArea={"d"} alignItems='center'>
          <Heading fontSize={"1rem"}>{switchState ? "Critical Hit" : "Normal Hit"}</Heading>
          <Switch
            isDisabled={editingIndex !== -1 && true}
            size='lg'
            onChange={() => {
              setSwitchState(!switchState);
            }}
          />
        </Flex>
        {/* Die properties */}
        <Flex gridArea={"e"} flexDir='column' alignItems='flex-end'>
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
        <Flex gridArea={"b"} flexDir='column' gap='1'>
          <Button
            onClick={() => saveDie()}
            isDisabled={editingIndex === -1 && true}
          >
            Save Die
          </Button>
          <Button
            onClick={() => deleteDie()}
            isDisabled={editingIndex === -1 && true}
          >
            Delete Die
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

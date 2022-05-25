// @ts-nocheck
import SingleDie from "../components/SingleDie";
import {
  Grid,
  GridItem,
  Heading,
  Box,
  Flex,
  Container,
} from "@chakra-ui/react";
import { useCalculatorContext } from "../features/calculatorContext.js";

export default function DieSection() {
  const { damageDiceList, setDamageDiceList } = useCalculatorContext();

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
                  // func: setDamageDiceList(),
                }}
              />
            );
          })}
        </Flex>
        <Box gridArea={"d"}>
          <Heading fontSize={"1rem"}>Normal/Crit</Heading>
          Switch
        </Box>
        <Flex gridArea={"e"}>NumberInput/Title</Flex>
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

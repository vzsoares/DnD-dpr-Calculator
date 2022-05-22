// @ts-nocheck
import DieRoll from "../components/DieRoll";
import { Grid, GridItem, Heading, Box, Flex } from "@chakra-ui/react";
export default function DieSection() {
  return (
    <>
      <Flex
        display='flex'
        gap={{ sm: "1", lg: "5" }}
        direction={{ base: "column", sm: "column", lg: "row" }}
      >
        <div className='damageDieSection'>
          <Heading>Damage dice</Heading>
          <Grid
            maxWidth='500px'
            templateColumns={{
              base: "repeat(5,1fr)",
            }}
          >
            <DieRoll props={{ value: "4" }} />
            <DieRoll props={{ value: "6" }} />
            <DieRoll props={{ value: "8" }} />
            <DieRoll props={{ value: "10" }} />
            <DieRoll props={{ value: "12" }} />
          </Grid>
        </div>
        <div className='critDieSection'>
          <Heading>Crit dice</Heading>
          <Grid
            maxWidth='500px'
            templateColumns={{
              base: "repeat(5,1fr)",
            }}
          >
            <DieRoll props={{ value: "4" }} />
            <DieRoll props={{ value: "6" }} />
            <DieRoll props={{ value: "8" }} />
            <DieRoll props={{ value: "10" }} />
            <DieRoll props={{ value: "12" }} />
          </Grid>
        </div>
      </Flex>
    </>
  );
}

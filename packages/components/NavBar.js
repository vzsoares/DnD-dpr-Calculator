import { Box, Flex, Heading } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Flex shadow='sm' backgroundColor='#090809' justifyContent='space-around'>
      <Flex
        maxW='998px'
        w='100%'
        padding='0.5rem'
        justifyContent='space-between'
      >
        <Heading fontSize={{ base: "1.4rem", md: "1.7rem" }} color='#fff'>
          Damage per Round Calculator
        </Heading>
        <Box>
          <p>github</p>
        </Box>
      </Flex>
    </Flex>
  );
}

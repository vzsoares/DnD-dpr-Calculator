import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export default function NavBar() {
  return (
    <Flex shadow='sm' backgroundColor='#090809' justifyContent='space-around'>
      <Flex
        maxW='998px'
        w='100%'
        padding='0.5rem'
        justifyContent='space-between'
        align='center'
      >
        <Heading
          fontSize={{ base: "1.6rem", md: "1.9rem" }}
          color='#fff'
          textAlign='center'
        >
          {"D&D 5e Damage Per Round Calculator"}
        </Heading>

        <Link
          href='https://github.com/vzsoares/DnD-dpr-Calculator'
          target='_blank'
        >
          <Icon
            color='#fff'
            fontSize={{ base: "1.4rem", md: "1.7rem" }}
            display='block'
            as={FaGithub}
          />
        </Link>
      </Flex>
    </Flex>
  );
}

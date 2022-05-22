import {
  Heading,
  Grid,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import AttackTable from "../components/AttackTable";
export default function AttackSection() {
  return (
    <Box maxW='468px'>
      <Heading>Current Attack info</Heading>
      <AttackTable props={{ value: ["1", "2", "3", "4", "5"], lines: "" }} />
      <br />
      <Heading>Total Attacks info</Heading>
      <AttackTable
        props={{
          value: ["1", "2", "3", "4", "5", "6"],
          lines: "Number of Attacks",
        }}
      />
    </Box>
  );
}

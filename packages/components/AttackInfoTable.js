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
export default function AttackTable({ props: { value, lines } }) {
  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead></Thead>
          <Tbody>
            {lines && (
              <Tr>
                <Td>{lines}</Td>
                <Td>{value[4]}</Td>
              </Tr>
            )}
            <Tr>
              <Td>Damage From Dice</Td>
              <Td>{value[0]}</Td>
            </Tr>
            <Tr>
              <Td>Damage From Bonus</Td>
              <Td>{value[1]}</Td>
            </Tr>
            <Tr>
              <Td>Damage From Crit Factor</Td>
              <Td>{value[2]}</Td>
            </Tr>

            <Tr>
              <Th>Total Attack Damage</Th>
              <Th>{value[3]}</Th>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

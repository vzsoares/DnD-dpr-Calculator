import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
export default function CurrentAttackTable({ props: { value } }) {
  return (
    <>
      <TableContainer>
        <Table size='sm' colorScheme='blackAlpha'>
          <Thead>
            <Tr>
              <Th>Chance To Hit</Th>
              <Th isNumeric>75%</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>Average Damage Per Turn</Th>
              <Th></Th>
            </Tr>
            <Tr>
              <Td pl='10%'>Dice</Td>
              <Td isNumeric>4.555</Td>
            </Tr>
            <Tr>
              <Td pl='10%'>Bonus</Td>
              <Td isNumeric>4.555</Td>
            </Tr>
            <Tr>
              <Td pl='10%'>Crit Factor</Td>
              <Td isNumeric>4.555</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold' pl='10%'>
                Total
              </Td>
              <Td isNumeric>4.555</Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex w='100%'>
          <Table size='sm' colorScheme='blackAlpha'>
            <Tbody>
              <Tr>
                <Th>Hit Damage</Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Td pl='10%'>Dice</Td>
                <Td isNumeric>4.555</Td>
              </Tr>
              <Tr>
                <Td pl='10%'>Bonus</Td>
                <Td isNumeric>4.555</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' pl='10%'>
                  Total
                </Td>
                <Td isNumeric>4.555</Td>
              </Tr>
            </Tbody>
          </Table>
          <Table size='sm' colorScheme='blackAlpha'>
            <Tbody>
              <Tr>
                <Th>Crit Damage</Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Td pl='10%'>Dice</Td>
                <Td isNumeric>4.555</Td>
              </Tr>
              <Tr>
                <Td pl='10%'>Bonus</Td>
                <Td isNumeric>4.555</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' pl='10%'>
                  Total
                </Td>
                <Td isNumeric>4.555</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </TableContainer>
    </>
  );
}

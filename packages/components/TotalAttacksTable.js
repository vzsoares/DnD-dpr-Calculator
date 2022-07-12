import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
export default function TotalAttacksTable({ props: { value } }) {
  return (
    <>
      <TableContainer>
        <Table variant='simple' colorScheme='blackAlpha' size='sm'>
          <Thead>
            <Tr>
              <Th>Total Attacks</Th>
              <Th isNumeric>{value.numberOfAttacks}</Th>
            </Tr>
          </Thead>
          <Thead>
            <Tr>
              <Th>Total Damage</Th>
              <Th isNumeric>{value.totalAttackDamage}</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

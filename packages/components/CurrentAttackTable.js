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
export default function CurrentAttackTable({ props: { displayedAttackInfo } }) {
  return (
    <>
      <TableContainer>
        <Table size='sm' colorScheme='blackAlpha'>
          <Thead>
            <Tr>
              <Th>Chance To Hit</Th>
              <Th isNumeric fontWeight='bold'>{`${(
                displayedAttackInfo?.chanceToHit * 100
              ).toFixed(2)}%`}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>Average Damage Per Turn</Th>
              <Th></Th>
            </Tr>
            <Tr>
              <Td pl='10%'>Dice</Td>
              <Td isNumeric>{displayedAttackInfo?.dpt.dice}</Td>
            </Tr>
            <Tr>
              <Td pl='10%'>Bonus</Td>
              <Td isNumeric>{displayedAttackInfo?.dpt.bonus}</Td>
            </Tr>
            <Tr>
              <Td pl='10%'>Crit Factor</Td>
              <Td isNumeric>{displayedAttackInfo?.dpt.critFactor}</Td>
            </Tr>
            <Tr>
              <Td fontWeight='bold' pl='10%'>
                Total
              </Td>
              <Td isNumeric fontWeight='bold'>
                {displayedAttackInfo?.dpt.total}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex w='100%'>
          <Table size='sm' colorScheme='blackAlpha'>
            <Tbody>
              <Tr>
                <Th pr='0'>Hit Damage</Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Td pl='10%' pr='0'>
                  Dice
                </Td>
                <Td isNumeric>{displayedAttackInfo?.nHit.dice}</Td>
              </Tr>
              <Tr>
                <Td pl='10%' pr='0'>
                  Bonus
                </Td>
                <Td isNumeric>{displayedAttackInfo?.nHit.bonus}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' pl='10%' pr='0'>
                  Total
                </Td>
                <Td isNumeric fontWeight='bold'>
                  {displayedAttackInfo?.nHit.total}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Table size='sm' colorScheme='blackAlpha'>
            <Tbody>
              <Tr>
                <Th pr='0'>Crit Damage</Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Td pl='10%' pr='0'>
                  Dice
                </Td>
                <Td isNumeric>{displayedAttackInfo?.cHit.dice}</Td>
              </Tr>
              <Tr>
                <Td pl='10%' pr='0'>
                  Bonus
                </Td>
                <Td isNumeric>{displayedAttackInfo?.cHit.bonus}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='bold' pl='10%' pr='0'>
                  Total
                </Td>
                <Td isNumeric fontWeight='bold'>
                  {displayedAttackInfo?.cHit.total}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </TableContainer>
    </>
  );
}

import { Flex, Heading, Text, Badge } from "@chakra-ui/react";
import { formatAddress } from "src/lib/helpers";

const DetailsCard = ({ item, active }) => {
  return (
    <Flex w="md" bg="gray.100" rounded="md" p={3}>
      <Flex w="100%" direction="column">
        <Heading>{item.nftData.name}</Heading>
        <Text>{`${item.collectionName} (${item.collectionSymbol})`}</Text>
        <Text>{formatAddress(item.minter)}</Text>
        <Text mt={6} as="i">
          {item.nftData.description}
        </Text>
      </Flex>
      {active && (
        <Badge
          alignSelf="start"
          colorScheme="green"
          variant="subtle"
          fontSize={17}
        >{`${item.marketPrice} MATIC`}</Badge>
      )}
    </Flex>
  );
};

export default DetailsCard;

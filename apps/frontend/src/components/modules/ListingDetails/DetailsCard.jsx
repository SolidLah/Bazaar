import { Flex, Heading, Text, Badge } from "@chakra-ui/react";

const DetailsCard = ({ item }) => {
  return (
    <Flex w="md" bg="gray.100" borderRadius="0.5rem" p={3}>
      <Flex w="100%" direction="column">
        <Heading>{item.nftData.name}</Heading>
        <Text>NFT collection</Text>
        <Text>{`${item.minter.slice(0, 3)}...${item.minter.slice(38)}`}</Text>
        <Text mt={6} as="i">
          {item.nftData.description}
        </Text>
      </Flex>
      <Badge
        alignSelf="start"
        colorScheme="green"
        variant="subtle"
        fontSize={17}
      >{`${item.marketPrice} MATIC`}</Badge>
    </Flex>
  );
};

export default DetailsCard;

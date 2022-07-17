import { Flex, Heading, Text, Badge, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { formatAddress } from "src/lib/helpers";

const DetailsCard = ({ item, active }) => {
  return (
    <Flex w="md" bg="gray.100" rounded="md" p={3}>
      <Flex w="100%" direction="column">
        <Heading>{item.nftData.name}</Heading>
        <NextLink href={`/collection/${item.collectionAddress}`} passHref>
          <Link color="purple">{`${item.collectionName} (${item.collectionSymbol})`}</Link>
        </NextLink>
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

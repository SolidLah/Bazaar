import { Badge, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { formatAddress } from "src/lib/helpers";
import { useFetchUserFromWalletAddress } from "src/lib/hooks";

const DetailsCard = ({ item, active }) => {
  const { data: minter } = useFetchUserFromWalletAddress(item.minter);
  const minterProfileUrl = minter ? `/user/${minter.uid}` : "";
  const minterName = minter ? `(${minter.name})` : "";

  return (
    <Flex w="md" bg="gray.100" rounded="xl" p={3}>
      <Flex w="100%" direction="column">
        <Heading>{item.nftData.name}</Heading>
        <Flex gap={1}>
          <Text>Collection:</Text>
          <NextLink href={`/collection/${item.collectionAddress}`} passHref>
            <Link color="purple">{`${item.collectionName} (${item.collectionSymbol})`}</Link>
          </NextLink>
        </Flex>
        <Flex gap={1}>
          <Text>Minter: </Text>
          <NextLink href={minterProfileUrl} passHref>
            <Link color="purple">{`${formatAddress(
              item.minter
            )} ${minterName}`}</Link>
          </NextLink>
        </Flex>
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

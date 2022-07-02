import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import Image from "next/image";
import BuyButton from "src/components/common/ui/BuyButton/BuyButton";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";

const ListingDetailsElement = ({ item, error }) => {
  if (!item) {
    return <LoadingLayout />;
  }

  if (error) {
    return <ErrorLayout />;
  }

  return (
    <VStack w="100%" p={10}>
      <HStack w="100%" justify="space-around" align="start">
        <Box w="xl" h="xl" pos="relative">
          <Image
            src={item.nftData.image}
            alt="NFT here"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <VStack w="md" h="100%" direction="column" alignItems="start">
          <Flex w="md" bg="gray.100" borderRadius="0.5rem" p={3}>
            <Flex w="100%" direction="column">
              <Heading>{item.nftData.name}</Heading>
              <Text>NFT collection</Text>
              <Text>
                {`${item.minter.slice(0, 3)}...${item.minter.slice(38)}`}
              </Text>
            </Flex>
            <Badge
              alignSelf="start"
              colorScheme="green"
              variant="subtle"
              fontSize={17}
            >{`${item.marketPrice} MATIC`}</Badge>
          </Flex>
          <Text>{item.nftData.description}</Text>
          <Spacer />
          <BuyButton item={item} width="full" />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default ListingDetailsElement;

import { Box, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { blurImage } from "src/lib/blurImage";
import ButtonArray from "./ButtonArray";
import DetailsCard from "./DetailsCard";

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
            placeholder="blur"
            blurDataURL={blurImage}
          />
        </Box>
        <VStack w="md" h="100%" direction="column" alignItems="start">
          <DetailsCard item={item} />
          <ButtonArray item={item} />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default ListingDetailsElement;

import { Box, Container, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { blurImage } from "src/lib/blurImage";
import BuyComponent from "./BuyComponent";
import DetailsCard from "./DetailsCard";
import ListComponent from "./ListComponent";

const ListingDetailsElement = ({ user, item, active }) => {
  return (
    <Container centerContent maxW="container.xl" mt={20}>
      <Flex w="100%" justify="space-around" align="flex-start">
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
        <Flex w="md" h="100%" direction="column" justify="flex-start" gap={6}>
          <DetailsCard item={item} active={active} />
          {active ? (
            <BuyComponent item={item} user={user} />
          ) : (
            <ListComponent item={item} />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default ListingDetailsElement;

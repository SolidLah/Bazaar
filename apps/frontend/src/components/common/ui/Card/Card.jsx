import { Square, Flex, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { blurImage } from "src/lib/blurImage";

const Card = ({ item }) => {
  return (
    <Square size={60} bg="gray.100" m={3} rounded={10}>
      <Flex
        w="100%"
        h="100%"
        direction="column"
        align="center"
        justify="flex-end"
      >
        <Box w="100%" h="100%" roundedTop={10} overflow="hidden" pos="relative">
          <Image
            src={item.nftData.image}
            alt="NFT here"
            priority="true"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={blurImage}
          />
        </Box>
        <Flex
          bg="gray.200"
          w="100%"
          p={3}
          roundedBottom={10}
          direction="row"
          justify="space-between"
          align="center"
        >
          <Heading size="md">{item.nftData.name}</Heading>
        </Flex>
      </Flex>
    </Square>
  );
};

export default Card;

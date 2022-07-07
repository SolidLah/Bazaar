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
        <Box w="100%" h="100%" pos="relative">
          <Image
            src={item.nftData.image}
            alt="NFT here"
            priority="true"
            layout="fill"
            objectFit="cover"
            style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
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
        >
          <Heading size="sm">{item.nftData.name}</Heading>
        </Flex>
      </Flex>
    </Square>
  );
};

export default Card;

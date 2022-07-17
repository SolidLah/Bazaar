import { Box, Flex, Heading, Square, Text } from "@chakra-ui/react";
import Image from "next/image";
import { blurImage } from "src/lib/blurImage";

const UserCollectionsCard = ({ collection }) => {
  return (
    <Flex
      w="13rem"
      border="2px"
      borderColor="gray.200"
      p={2}
      gap={2}
      align="center"
      direction="column"
      rounded="md"
      overflow="hidden"
    >
      <Square size="12rem" rounded="md" overflow="hidden">
        <Box w="100%" h="100%" pos="relative">
          <Image
            src="/ape.jpg"
            alt="NFT here"
            priority="true"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={blurImage}
          />
        </Box>
      </Square>
      <Flex
        w="12rem"
        bg="gray.100"
        p={2}
        rounded="md"
        overflow="hidden"
        direction="column"
      >
        <Heading size="md">{collection.name}</Heading>
        <Text size="sm">{collection.symbol}</Text>
      </Flex>
    </Flex>
  );
};

export default UserCollectionsCard;

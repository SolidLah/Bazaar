import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Square,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blurImage } from "src/lib/blurImage";

const CollectionsCard = ({ collection }) => {
  return (
    <LinkBox>
      <Flex
        as={motion.div}
        w="13rem"
        border="2px"
        borderColor="gray.200"
        p={2}
        gap={2}
        align="center"
        direction="column"
        rounded="xl"
        overflow="hidden"
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ y: -3, scale: 1.02 }}
      >
        <Square size="12rem" rounded="xl" overflow="hidden">
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
          rounded="xl"
          overflow="hidden"
          direction="column"
        >
          <Heading size="md">
            <Link href={`/collection/${collection.address}`} passHref>
              <LinkOverlay>{collection.name}</LinkOverlay>
            </Link>
          </Heading>
          <Text size="sm">{collection.symbol}</Text>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default CollectionsCard;

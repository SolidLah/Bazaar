import {
  Square,
  Flex,
  Box,
  Heading,
  Badge,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AddToWatchListButton from "src/components/common/ui/AddToWatchlistButton/AddToWatchlistButton";
import { blurImage } from "src/lib/blurImage";

const LinkedCard = ({ item, watchlistEnabled }) => {
  return (
    <LinkBox>
      <Square
        as={motion.div}
        size={60}
        bg="gray.100"
        m={3}
        rounded={10}
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ y: -3, scale: 1.02 }}
      >
        <Flex
          w="100%"
          h="100%"
          direction="column"
          align="center"
          justify="flex-end"
        >
          <Box
            w="100%"
            h="100%"
            roundedTop={10}
            overflow="hidden"
            pos="relative"
          >
            <Image
              src={item.nftData.image}
              alt="NFT here"
              priority="true"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={blurImage}
            />
            {watchlistEnabled && (
              <AddToWatchListButton
                item={item}
                position="absolute"
                m={3}
                variant="ghost"
                colorScheme="yellow"
                zIndex="2"
              />
            )}
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
            <Heading size="md">
              <Link href={`/marketplace/details/${item.itemId}`} passHref>
                <LinkOverlay>{item.nftData.name}</LinkOverlay>
              </Link>
            </Heading>
            <Badge colorScheme="green" variant="subtle" fontSize="sm">
              {item.marketPrice} MATIC
            </Badge>
          </Flex>
        </Flex>
      </Square>
    </LinkBox>
  );
};

export default LinkedCard;

import {
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const CollectionsCard = ({ collection, isMyProfile }) => {
  return (
    <LinkBox>
      <Flex
        as={motion.div}
        w="100%"
        border="2px"
        borderColor="gray.200"
        p="1rem"
        rounded="xl"
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ scale: 1.02 }}
        justify="space-between"
        align="center"
        bg="white"
      >
        <Flex direction="column">
          <Heading size="md">
            <Link href={`/collection/${collection.address}`} passHref>
              <LinkOverlay>{collection.name}</LinkOverlay>
            </Link>
          </Heading>
          <Text size="sm">{collection.symbol}</Text>
        </Flex>
        {isMyProfile && (
          <Link href={`/collection/${collection.address}/mint`} passHref>
            <Button as="a" colorScheme="purple" zIndex="2" size="lg">
              Mint
            </Button>
          </Link>
        )}
      </Flex>
    </LinkBox>
  );
};

export default CollectionsCard;

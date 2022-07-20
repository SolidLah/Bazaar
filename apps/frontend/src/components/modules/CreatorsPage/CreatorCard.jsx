import {
  Avatar,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatAddress } from "src/lib/helpers";
import FollowButton from "../UserProfilePage/FollowButton";

const CreatorCard = ({ creator }) => {
  return (
    <LinkBox>
      <Flex
        bg="gray.100"
        borderRadius="md"
        direction="column"
        align="center"
        p={6}
        as={motion.div}
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ y: -3, scale: 1.02 }}
        gap={3}
      >
        <Avatar size="2xl" src={creator.avatar} />
        <Flex justify="space-between">
          <Flex direction="column">
            <Link>
              <LinkOverlay>
                <Heading>{creator.name}</Heading>
              </LinkOverlay>
            </Link>
            <Text>{formatAddress(creator.walletAddress)}</Text>
          </Flex>
          <FollowButton uid={creator.uid} zIndex={2} />
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default CreatorCard;

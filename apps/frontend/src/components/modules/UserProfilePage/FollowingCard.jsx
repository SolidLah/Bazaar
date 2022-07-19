import {
  Avatar,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatAddress } from "src/lib/helpers";
import FollowButton from "./FollowButton";

const FollowingCard = ({ user }) => {
  return (
    <LinkBox>
      <Flex
        as={motion.div}
        justify="flex-start"
        align="center"
        p={3}
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        gap={6}
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ scale: 1.02 }}
      >
        <Avatar size="md" />
        <Flex direction="column">
          <Link href={`/user/${user.uid}`} passHref>
            <LinkOverlay as="a">
              <Heading size="md">{user.name}</Heading>
            </LinkOverlay>
          </Link>
          <Text>{formatAddress(user.walletAddress)}</Text>
        </Flex>
        <Spacer />
        <FollowButton uid={user.uid} zIndex="2" />
      </Flex>
    </LinkBox>
  );
};

export default FollowingCard;

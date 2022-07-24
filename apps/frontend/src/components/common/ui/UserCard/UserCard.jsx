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
import FollowButton from "../FollowButton/FollowButton";

const UserCard = ({ user, disableFollow, ...props }) => {
  return (
    <LinkBox {...props}>
      <Flex
        justify="flex-start"
        align="center"
        p={3}
        border="2px"
        borderColor="gray.300"
        rounded="xl"
        gap={6}
        as={motion.div}
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ scale: 1.02 }}
        bg="white"
      >
        <Avatar size="md" src={user.avatar} />
        <Flex direction="column">
          <Link href={`/user/${user.uid}`} passHref>
            <LinkOverlay as="a">
              <Heading size="md">{user.name}</Heading>
            </LinkOverlay>
          </Link>
          <Text>{formatAddress(user.walletAddress)}</Text>
        </Flex>
        <Spacer />
        {!disableFollow && <FollowButton uid={user.uid} zIndex="2" />}
      </Flex>
    </LinkBox>
  );
};

export default UserCard;

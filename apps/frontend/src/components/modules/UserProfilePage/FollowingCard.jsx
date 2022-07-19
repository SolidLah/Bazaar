import { Avatar, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { formatAddress } from "src/lib/helpers";
import FollowButton from "./FollowButton";

const FollowingCard = ({ user }) => {
  return (
    <Flex
      justify="flex-start"
      align="center"
      p={3}
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      gap={6}
    >
      <Avatar size="md" />
      <Flex direction="column">
        <Heading size="md">{user.name}</Heading>
        <Text>{formatAddress(user.walletAddress)}</Text>
      </Flex>
      <Spacer />
      <FollowButton uid={user.uid} />
    </Flex>
  );
};

export default FollowingCard;

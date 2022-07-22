import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import FollowButton from "src/components/common/ui/FollowButton/FollowButton";
import { formatAddress } from "src/lib/helpers";

const DetailsComponent = ({ uid, data, isMyProfile }) => {
  const { walletAddress, name, email, avatar } = data;

  return (
    <Flex
      direction="column"
      align="center"
      minW="60"
      maxW="60"
      h="max-content"
      p="6"
      gap="6"
      bg="gray.200"
      rounded="xl"
    >
      <Avatar size="full" src={avatar} />
      <Flex direction="column" gap={3} w="100%">
        <Box>
          <Text fontWeight="bold">Name</Text>
          <Text>{name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Email</Text>
          <Text noOfLines={1}>{email}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Wallet address</Text>
          <Text>{walletAddress ? formatAddress(walletAddress) : ""}</Text>
        </Box>
        {isMyProfile ? (
          <Link href="/user/update" passHref>
            <Button as="a" colorScheme="purple">
              Update details
            </Button>
          </Link>
        ) : (
          <FollowButton uid={uid} />
        )}
      </Flex>
    </Flex>
  );
};

export default DetailsComponent;

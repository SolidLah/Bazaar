import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import FollowButton from "src/components/common/ui/FollowButton/FollowButton";
import { userContext } from "src/contexts/userContext";
import { formatAddress } from "src/lib/helpers";

const DetailsComponent = ({ data }) => {
  const router = useRouter();
  const { uid } = router.query;

  // url query user
  const walletAddress = data?.walletAddress;
  const name = data?.name;
  const email = data?.email;

  // current logged in user
  const { uid: myUid } = useContext(userContext);
  const isMyProfile = uid && myUid ? uid === myUid : false;

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
      <Avatar size="100%" />
      <Flex direction="column" gap={3} w="100%">
        <Box>
          <Text fontWeight="bold">Name</Text>
          <Text>{name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Email</Text>
          <Text>{email}</Text>
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

import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import { formatAddress } from "src/lib/helpers";
import { useEmail, useName, useStoredAddress } from "src/lib/hooks";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import FollowButton from "./FollowButton";

const UserDetailsComponent = ({ uid, userData }) => {
  // url query user
  const successToast = useSuccessToast("Connect wallet to account");
  const storedAddress = useStoredAddress(userData);
  const name = useName(userData);
  const email = useEmail(userData);

  // current logged in user
  const { authState } = useContext(userContext);
  const [user] = authState;
  const myUid = user ? user.uid : null;

  const buttonCallback = async () => {
    successToast({
      description: "Updated details",
    });
  };

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
          <Text>{storedAddress ? formatAddress(storedAddress) : ""}</Text>
        </Box>
        {myUid === uid ? (
          <Button colorScheme="purple" onClick={buttonCallback}>
            Update details
          </Button>
        ) : (
          <FollowButton uid={uid} />
        )}
      </Flex>
    </Flex>
  );
};

export default UserDetailsComponent;

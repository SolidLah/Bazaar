import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { formatAddress } from "src/lib/helpers";
import { useEmail, useName, useStoredAddress } from "src/lib/hooks";
import useErrorToast from "src/lib/hooks/useErrorToast";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import useEthersStore from "src/stores/ethersStore";

const UserDetailsComponent = ({ userData }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const ethersAddress = useEthersStore((state) => state.address);
  const errorToast = useErrorToast("Connect wallet to account");
  const successToast = useSuccessToast("Connect wallet to account");
  const storedAddress = useStoredAddress(userData);
  const name = useName(userData);
  const email = useEmail(userData);

  const buttonCallback = async () => {
    successToast({
      description: "Wallet has been connected successfully",
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
        <Button colorScheme="purple" onClick={buttonCallback}>
          {storedAddress ? "Change" : "Connect"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserDetailsComponent;

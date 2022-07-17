import { Text, Avatar, Button, Flex, Box } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import { formatAddress, updateWalletAddress } from "src/lib/helpers";

const UserDetailsComponent = ({ user, fireStoredAddress }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const ethersStoredAddress = useEthersStore((state) => state.address);
  const errorToast = useErrorToast("Connect wallet to account");
  const successToast = useSuccessToast("Connect wallet to account");

  const buttonCallback = async () => {
    if (!ethersInitialised) {
      errorToast({
        description: "No connected wallet found",
      });

      return;
    }

    if (ethersStoredAddress === fireStoredAddress) {
      errorToast({
        description: "No change in wallet address",
      });

      return;
    }

    await updateWalletAddress(user.uid, ethersStoredAddress);

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
          <Text>{user.displayName}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Email</Text>
          <Text>{user.email}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Wallet address</Text>
          <Text>
            {fireStoredAddress ? formatAddress(fireStoredAddress) : ""}
          </Text>
        </Box>
        <Button colorScheme="teal" onClick={buttonCallback}>
          {fireStoredAddress ? "Change" : "Connect"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserDetailsComponent;

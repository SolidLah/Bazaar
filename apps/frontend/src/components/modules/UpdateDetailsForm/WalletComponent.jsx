import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { formatAddress, updateUserDetail } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";

const WalletComponent = ({ uid, current, metamask }) => {
  const NO_WALLET_STR = "No wallet connected";
  const displayCurrent = current ? formatAddress(current) : NO_WALLET_STR;
  const displayMetamask = metamask ? formatAddress(metamask) : NO_WALLET_STR;

  const updateWalletAddress = async () => {
    if (!uid) throw new Error("Not logged in");
    if (!metamask) throw new Error(NO_WALLET_STR);
    if (current === metamask) throw new Error("Same as current");

    await updateUserDetail(uid, { walletAddress: metamask });
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Update wallet address",
    updateWalletAddress
  );

  return (
    <Flex direction="column" gap="0.3rem" w="md">
      <Heading size="md" mb="0.3rem">
        Wallet Address
      </Heading>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text>Current: {displayCurrent}</Text>
          <Text>Metamask: {displayMetamask}</Text>
        </Flex>
        <Button
          colorScheme="purple"
          onClick={toastedCallback}
          w="max-content"
          isLoading={loading}
        >
          Change
        </Button>
      </Flex>
    </Flex>
  );
};

export default WalletComponent;

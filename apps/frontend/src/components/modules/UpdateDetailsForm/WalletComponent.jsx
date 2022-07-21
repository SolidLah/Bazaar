import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { updateUserDetail } from "src/lib/helpers";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";

const WalletComponent = ({ uid, current, metamask }) => {
  const errorToast = useErrorToast("Update wallet address");
  const successToast = useSuccessToast("Update wallet address");

  const NULL_STRING = "No wallet connected";
  const [loading, setLoading] = useState(false);

  const callBack = async () => {
    setLoading(true);

    try {
      if (!metamask) throw new Error(NULL_STRING);
      if (current === metamask) throw new Error("Same as current");

      await updateUserDetail(uid, { walletAddress: metamask });
      successToast();
    } catch (error) {
      console.log(error);
      errorToast({
        description: error.message,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <Flex direction="column" gap={1} w="md">
      <Heading size="md" mb={1}>
        Wallet Address
      </Heading>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text>Current: {current}</Text>
          <Text>Metamask: {metamask ?? NULL_STRING}</Text>
        </Flex>
        <Button
          colorScheme="purple"
          onClick={callBack}
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

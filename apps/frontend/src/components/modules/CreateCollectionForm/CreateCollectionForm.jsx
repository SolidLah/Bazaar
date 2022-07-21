import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createCollection, getWeb3 } from "src/lib/helpers";
import {
  useErrorToast,
  useSuccessToast,
  useValidatedAddress,
} from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const CreateCollectionForm = () => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const isValidated = useValidatedAddress();
  const errorToast = useErrorToast("Create collection");
  const successToast = useSuccessToast("Create collection");

  const collectionNameRef = useRef("");
  const collectionSymbolRef = useRef("");
  const [loading, setLoading] = useState(false);

  const buttonCallback = async () => {
    const collectionName = collectionNameRef.current.value;
    const collectionSymbol = collectionSymbolRef.current.value;

    const web3Error = getWeb3(ethersInitialised);
    if (web3Error !== "") {
      errorToast({
        description: web3Error,
      });
      return;
    }

    if (!isValidated) return;

    if (!collectionName || !collectionSymbol) {
      errorToast({
        description: "Missing fields",
      });
      return;
    }

    setLoading(true);

    try {
      const contractAddress = await createCollection(
        uid,
        collectionName,
        collectionSymbol
      );
      successToast({
        description: `Created collection successfully.\nContract address: ${contractAddress}`,
      });
    } catch (error) {
      errorToast({
        description: error.message,
      });
      setLoading(false);
      return;
    }

    collectionNameRef.current.value = "";
    collectionSymbolRef.current.value = "";
    setLoading(false);
  };

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md" gap={3}>
        <Heading textAlign="center">Create collection</Heading>
        <Input
          ref={collectionNameRef}
          placeholder="collection name"
          variant="filled"
        />
        <Input
          ref={collectionSymbolRef}
          placeholder="collection symbol"
          variant="filled"
        />
        <Button
          onClick={buttonCallback}
          isLoading={loading}
          isDisabled={!isValidated}
          colorScheme="purple"
        >
          Create collection
        </Button>
      </Flex>
    </Center>
  );
};

export default CreateCollectionForm;

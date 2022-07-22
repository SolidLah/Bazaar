import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { getWeb3, listNFT } from "src/lib/helpers";
import {
  useErrorToast,
  useSuccessToast,
  useValidatedAddress,
} from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const ListComponent = ({ item, walletAddress }) => {
  const isValidated = useValidatedAddress();
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const priceRef = useRef("");
  const [loading, setLoading] = useState(false);
  const errorToast = useErrorToast("Listing NFT");
  const successToast = useSuccessToast("Listing NFT");
  const router = useRouter();

  const isOwner = useMemo(
    () => (walletAddress && item ? walletAddress === item.owner : false),
    [walletAddress, item]
  );

  const buttonCallback = async () => {
    const price = priceRef.current?.value;

    const web3Error = getWeb3(ethersInitialised);
    if (web3Error !== "") {
      errorToast({
        description: web3Error,
      });
      return;
    }

    if (!isValidated) {
      errorToast({
        description: "Metamask wallet does not match user's wallet",
      });
      return;
    }

    if (!price) {
      errorToast({
        description: "Missing fields",
      });
      return;
    }

    setLoading(true);

    try {
      await listNFT(item.collectionAddress, item.itemId, price);
      successToast();
      router.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast({
        description: error.message,
      });
      return;
    }

    priceRef.current.value = null;
    setLoading(false);
  };

  return (
    <Flex gap={3}>
      <InputGroup>
        <Input ref={priceRef} placeholder="price" variant="filled" />
        <InputRightAddon bg="gray.200">
          <Heading size="xs">MATIC</Heading>
        </InputRightAddon>
      </InputGroup>
      <Button
        onClick={buttonCallback}
        isLoading={loading}
        colorScheme="purple"
        px={6}
        isDisabled={!isOwner}
      >
        List
      </Button>
    </Flex>
  );
};

export default ListComponent;

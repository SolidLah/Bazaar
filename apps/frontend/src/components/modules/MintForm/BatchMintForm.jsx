import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { getWeb3, mintManyNFTs, uploadManyNFTs } from "src/lib/helpers";
import {
  useErrorToast,
  useSuccessToast,
  useValidatedAddress,
} from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const BatchMintForm = ({ address }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const isValidated = useValidatedAddress();
  const errorToast = useErrorToast("Minting NFT");
  const successToast = useSuccessToast("Minting NFT");

  const zipRef = useRef();
  const descriptionRef = useRef();
  const [loading, setLoading] = useState("");

  const buttonCallback = async () => {
    const zip = zipRef.current?.files[0];
    const description = descriptionRef.current?.value;

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

    if (!zip || !description) {
      errorToast({
        description: "Missing fields",
      });

      return;
    }

    let urls;

    // upload to IPFS
    try {
      setLoading("Uploading images");
      urls = await uploadManyNFTs(zip, description);
      successToast({
        description: "Upload success",
      });
    } catch (error) {
      console.log(error);
      errorToast({
        description: "Error occurred uploading NFTs",
      });
      setLoading("");
      return;
    }

    // mint NFT
    try {
      setLoading("Minting NFTs");
      await mintManyNFTs(address, urls);
      successToast({
        description: "Minting success",
      });
    } catch (error) {
      console.log(error);
      errorToast({
        description: "Error occurred minting NFTs",
      });
      setLoading("");
      return;
    }

    zipRef.current.value = "";
    descriptionRef.current.value = "";
    setLoading("");
  };

  return (
    <Flex
      p={12}
      rounded="md"
      direction="column"
      gap={3}
      bg="gray.100"
      w="max-content"
      mx="auto"
    >
      <Heading align="center">Mint multiple NFT</Heading>
      <Input ref={zipRef} type="file" accept=".zip" />
      <Input ref={descriptionRef} placeholder="description" variant="filled" />
      <Button
        onClick={buttonCallback}
        isLoading={loading !== ""}
        loadingText={loading}
        colorScheme="purple"
      >
        Mint
      </Button>
    </Flex>
  );
};

export default BatchMintForm;

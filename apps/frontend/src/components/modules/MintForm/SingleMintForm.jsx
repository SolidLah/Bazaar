import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { getWeb3, mintNFT, uploadNFT } from "src/lib/helpers";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const SingleMintForm = ({ address }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);

  const imageRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [loading, setLoading] = useState("");

  const errorToast = useErrorToast("Minting NFT");
  const successToast = useSuccessToast("Minting NFT");

  const buttonCallback = async () => {
    const image = imageRef.current?.files[0];
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;

    const web3Error = getWeb3(ethersInitialised);
    if (web3Error !== "") {
      errorToast({
        description: web3Error,
      });
      return;
    }

    if (!image || !name || !description) {
      errorToast({
        description: "Missing fields",
      });

      return;
    }

    let url;

    // upload to IPFS
    try {
      setLoading("Uploading Image");
      url = await uploadNFT(image, name, description);
      successToast({
        description: "Upload success",
      });
    } catch (error) {
      console.log(error);
      errorToast({
        description: "Error occured uploading NFT",
      });
      setLoading("");
      return;
    }

    // mint NFT
    try {
      setLoading("Minting NFT");
      await mintNFT(address, url);
      successToast({
        description: "Minting success",
      });
    } catch (error) {
      console.log(error);
      errorToast({
        description: "Error occured minting NFT",
      });
      setLoading("");
      return;
    }

    imageRef.current.value = "";
    nameRef.current.value = "";
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
      <Heading align="center">Mint single NFT</Heading>
      <Input ref={imageRef} type="file" accept="image/*" />
      <Input ref={nameRef} placeholder="name" variant="filled" />
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

export default SingleMintForm;

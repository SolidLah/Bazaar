import { useState, useRef } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Center,
} from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";
import { uploadNFT, mintNFT, listNFT } from "src/lib/helpers";

const MintForm = () => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);

  const imageRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const [loading, setLoading] = useState("");

  const errorToast = useErrorToast("Minting NFT");
  const successToast = useSuccessToast("Minting NFT");

  const buttonCallback = async () => {
    const image = imageRef.current?.files[0];
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const price = Number(priceRef.current?.value);

    if (typeof window.ethereum === "undefined") {
      errorToast({
        description: "Metamask is not installed!",
      });

      return;
    }

    if (!ethersInitialised) {
      errorToast({
        description: "Connect a Metamask wallet!",
      });

      return;
    }

    if (!image || !price || !name || !description) {
      errorToast({
        description: "Missing fields",
      });

      return;
    }

    // upload image then NFT to IPFS
    let nftURI;

    try {
      setLoading("Uploading Image");
      nftURI = await uploadNFT(image, name, description);
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

    // mint and list NFT
    try {
      setLoading("Minting NFT");
      const tokenId = await mintNFT(nftURI); // mint NFT
      await listNFT(tokenId, price); // list NFT
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
    priceRef.current.value = "";
    setLoading("");
  };

  return (
    <Center h="100%" w="100%" p={10} flexDirection="column">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading align="center" mb={6}>
          Mint NFT
        </Heading>
        <Input ref={imageRef} type="file" mb={3} />
        <Input ref={nameRef} placeholder="name" variant="filled" mb={3} />
        <Input
          ref={descriptionRef}
          placeholder="description"
          variant="filled"
          mb={3}
        />
        <InputGroup>
          <Input ref={priceRef} placeholder="price" variant="filled" mb={6} />
          <InputRightAddon
            color="gray.500"
            bg="gray.200"
            fontSize={13}
            fontWeight="bold"
          >
            MATIC
          </InputRightAddon>
        </InputGroup>
        <Button
          onClick={buttonCallback}
          isLoading={loading !== ""}
          loadingText={loading}
          colorScheme="teal"
        >
          Mint
        </Button>
      </Flex>
    </Center>
  );
};

export default MintForm;

import { useState } from "react";
import { getWeb3, mintManyNFTs, uploadManyNFTs } from "src/lib/helpers";
import {
  useSuccessToast,
  useToastedCallback,
  useValidatedAddress,
} from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const useComponentState = (address) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const isValidated = useValidatedAddress();
  const successToast = useSuccessToast("Minting NFT");

  const [zip, setZip] = useState(undefined);
  const [description, setDescription] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const callback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error) throw new Error(web3Error);

    if (!isValidated)
      throw new Error("Metamask wallet does not match user's wallet");

    if (!zip || !description) throw new Error("Missing fields");

    setLoadingMessage("");

    const urls = await upload();
    successToast({
      description: "Upload success",
    });

    await mint(urls);
    successToast({
      description: "Minting success",
    });

    setLoadingMessage("");
    setZip(undefined);
    setDescription("");
  };

  const upload = async () => {
    try {
      setLoadingMessage("Uploading images");
      return await uploadManyNFTs(zip, description);
    } catch (error) {
      setLoadingMessage("");
      throw new Error("Error occurred uploading NFTs");
    }
  };

  const mint = async (urls) => {
    try {
      setLoadingMessage("Minting NFTs");
      await mintManyNFTs(address, urls);
    } catch (error) {
      setLoadingMessage("");
      throw new Error("Error occurred minting NFTs");
    }
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Minting NFT",
    callback,
    false
  );

  const handleZip = (e) => {
    e.preventDefault();
    setZip(e.target.files[0]);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  return {
    handleZip,
    description,
    handleDescription,
    toastedCallback,
    loading,
    loadingMessage,
  };
};

export default useComponentState;

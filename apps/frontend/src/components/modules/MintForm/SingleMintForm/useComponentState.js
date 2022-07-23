import { useState } from "react";
import { getWeb3, mintNFT, uploadNFT } from "src/lib/helpers";
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

  const [image, setImage] = useState(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const callback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error) throw new Error(web3Error);

    if (!isValidated)
      throw new Error("Metamask wallet does not match user's wallet");

    if (!image || !name || !description) throw new Error("Missing fields");

    setLoadingMessage("");

    const url = await upload();
    successToast({
      description: "Upload success",
    });

    await mint(url);
    successToast({
      description: "Minting success",
    });

    setLoadingMessage("");
    setImage(undefined);
    setName("");
    setDescription("");
  };

  const upload = async () => {
    try {
      setLoadingMessage("Uploading image");
      return await uploadNFT(image, name, description);
    } catch (error) {
      setLoadingMessage("");
      throw new Error("Error occurred uploading NFT");
    }
  };

  const mint = async (url) => {
    try {
      setLoadingMessage("Minting NFT");
      await mintNFT(address, url);
    } catch (error) {
      setLoadingMessage("");
      throw new Error("Error occurred minting NFT");
    }
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Minting NFT",
    callback,
    false
  );

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  return {
    handleImage,
    name,
    handleName,
    description,
    handleDescription,
    toastedCallback,
    loading,
    loadingMessage,
  };
};

export default useComponentState;

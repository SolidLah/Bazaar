import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { getWeb3, listNFT } from "src/lib/helpers";
import { useToastedCallback, useValidatedAddress } from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const useComponentState = (item, walletAddress) => {
  const isValidated = useValidatedAddress();
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const router = useRouter();

  const [price, setPrice] = useState("");

  const isOwner = useMemo(
    () => (walletAddress && item ? walletAddress === item.owner : false),
    [walletAddress, item]
  );

  const callback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error) throw new Error(web3Error);

    if (!isValidated)
      throw new Error("Metamask wallet does not match user's wallet");

    if (!price) throw new Error("Missing fields");

    if (!Number(price)) throw new Error("Not a number");

    await listNFT(item.collectionAddress, item.itemId, price);

    setPrice("");
    router.reload();
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Listing NFT",
    callback
  );

  const handlePrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  return { price, handlePrice, toastedCallback, loading, isOwner };
};

export default useComponentState;

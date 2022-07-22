import { useContext, useState } from "react";
import { userContext } from "src/contexts/userContext";
import { createCollection, getWeb3 } from "src/lib/helpers";
import { useToastedCallback, useValidatedAddress } from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const useComponentState = () => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const isValidated = useValidatedAddress();
  const { uid } = useContext(userContext);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const callback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error) throw new Error(web3Error);

    if (!isValidated)
      throw new Error("Metamask wallet does not match user's wallet");

    if (!name || !symbol) throw new Error("Missing fields");

    await createCollection(uid, name, symbol);

    setName("");
    setSymbol("");
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Create collection",
    callback
  );

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSymbol = (e) => {
    e.preventDefault();
    setSymbol(e.target.value);
  };

  return { toastedCallback, loading, name, symbol, handleName, handleSymbol };
};

export default useComponentState;

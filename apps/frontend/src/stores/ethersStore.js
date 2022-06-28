import create from "zustand";
import { persist } from "zustand/middleware";
import { ethers } from "ethers";
import { NFTContractData, MarketplaceContractData } from "src/contracts";

const useEthersStore = create((set, get) => ({
  provider: null,
  signer: null,
  address: null,
  nftContract: null,
  mktContract: null,
  ethersInitialised: false,
  initialiseEthers: async () => {
    if (get().ethersInitialised) {
      return;
    }

    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask not installed!");
      return;
    }

    const currProvider = new ethers.providers.Web3Provider(window.ethereum);
    await currProvider.send("eth_requestAccounts", []);
    const currSigner = currProvider.getSigner();
    const currAddress = await currSigner.getAddress();

    const currNftContract = new ethers.Contract(
      NFTContractData.address,
      NFTContractData.abi,
      currSigner
    );

    const currMktContract = new ethers.Contract(
      MarketplaceContractData.address,
      MarketplaceContractData.abi,
      currSigner
    );

    set({
      provider: currProvider,
      signer: currSigner,
      address: currAddress,
      nftContract: currNftContract,
      mktContract: currMktContract,
      ethersInitialised: true,
    });
  },
}));

export default useEthersStore;

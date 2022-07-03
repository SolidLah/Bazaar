import create from "zustand";
// import { persist } from "zustand/middleware";
import { ethers } from "ethers";
import { NFTContractData, MarketplaceContractData } from "src/contracts";

let ethersStore = (set, get) => ({
  provider: null,
  signer: null,
  address: null,
  nftContract: null,
  mktContract: null,
  ethersInitialised: false,
  initialiseEthers: async () => {
    if (get().ethersInitialised) {
      throw new Error("Wallet already connected");
    }

    if (typeof window.ethereum === "undefined") {
      throw new Error("Metamask not installed");
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
});

// middleware
// ethersStore = persist(ethersStore, {
//   name: "ethers-storage",
//   partialize: (state) =>
//     Object.fromEntries(
//       Object.entries(state).filter(
//         ([key]) => !["initialiseEthers"].includes(key)
//       )
//     ),
// });

const useEthersStore = create(ethersStore);

export default useEthersStore;

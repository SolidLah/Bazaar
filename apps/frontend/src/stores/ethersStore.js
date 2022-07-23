import create from "zustand";
import { persist } from "zustand/middleware";

let ethersStore = (set) => ({
  signer: null,
  address: null,
  mktContract: null,
  ethersInitialised: false,
  setSigner: (n) => set({ signer: n }),
  setAddress: (n) => set({ address: n }),
  setMktContract: (n) => set({ mktContract: n }),
  setEthersInitialised: (n) => set({ ethersInitialised: n }),
});

ethersStore = persist(ethersStore, {
  name: "ethersStore",
  partialize: (state) => ({
    address: state.address,
    ethersInitialised: state.ethersInitialised,
  }),
});
const useEthersStore = create(ethersStore);

export default useEthersStore;

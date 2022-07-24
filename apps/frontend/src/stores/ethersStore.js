import create from "zustand";
import { persist, devtools } from "zustand/middleware";

let ethersStore = (set) => ({
  provider: null,
  signer: null,
  address: "",
  mktContract: null,
  ethersInitialised: false,
  setProvider: (n) => set({ provider: n }),
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
ethersStore = devtools(ethersStore);
const useEthersStore = create(ethersStore);

export default useEthersStore;

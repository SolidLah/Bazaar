import create from "zustand"

const useListingsStore = create((set) => ({
  listings: [],
  setListings: (listings) => set({ listings }),
}))

export default useListingsStore

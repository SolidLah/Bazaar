import create from "zustand"
import axios from "axios"

const useListingsStore = create((set) => ({
  listings: [],
  setListings: async () => {
    const listings = (await axios.get("http://localhost:3000/api/listings"))
      .data.msg

    set({ listings })
  },
}))

export default useListingsStore

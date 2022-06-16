import create from "zustand"
import axios from "axios"

const URL = "http://localhost:3000/api/listings"

const useListingsStore = create((set) => ({
  listings: [],
  setListings: async () => {
    const listings = (await axios.get(URL)).data.msg

    set({ listings })
  },
}))

export default useListingsStore

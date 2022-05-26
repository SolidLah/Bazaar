import { createContext, useContext, useState, useCallback } from "react"
import { getEthersState } from "src/functions"

const web3Context = createContext({
  contracts: {
    nftContract: null,
    setNftContract: null,
    marketplaceContract: null,
    setMarketplaceContract: null,
  },
  accounts: {
    address: null,
    setAddress: null,
  },
  interface: {
    initialiseEthers: null,
    ethersInitialised: null,
    provider: null,
    setProvider: null,
    signer: null,
    setSigner: null,
  },
})

const Web3ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [address, setAddress] = useState("")
  const [nftContract, setNftContract] = useState(null)
  const [marketplaceContract, setMarketplaceContract] = useState(null)
  const [initialised, setInitialised] = useState(false)

  const initialiseEthers = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask not installed!")
      return
    }

    try {
      let tmpProvider = provider

      if (!tmpProvider) {
        const {
          currProvider,
          currSigner,
          currAddress,
          currNftContract,
          currMktContract,
        } = await getEthersState()

        setProvider(currProvider)
        setSigner(currSigner)
        setAddress(currAddress)
        setNftContract(currNftContract)
        setMarketplaceContract(currMktContract)
      }

      setInitialised(true)
    } catch (error) {
      console.log("[Ethers initialisation error]", error)
      return
    }
  }, [provider])

  const values = {
    contracts: {
      nftContract: nftContract,
      setNftContract: setNftContract,
      marketplaceContract: marketplaceContract,
      setMarketplaceContract: setMarketplaceContract,
    },
    accounts: {
      address: address,
      setAddress: setAddress,
    },
    interface: {
      initialiseEthers: initialiseEthers,
      ethersInitialised: initialised,
      provider: provider,
      setProvider: setProvider,
      signer: signer,
      setSigner: setSigner,
    },
  }

  return <web3Context.Provider value={values}>{children}</web3Context.Provider>
}

const useWeb3Context = () => {
  return useContext(web3Context)
}

export { Web3ContextProvider, useWeb3Context }

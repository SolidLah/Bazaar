import { createContext, useContext, useState } from "react"

const web3Context = createContext({
  contracts: {
    nft: {
      nftContract: null,
      setNftContract: null,
    },
  },
  accounts: {
    currentAddress: null,
    setAddress: null,
  },
  interface: {
    provider: null,
    setProvider: null,
    signer: null,
    setSigner: null,
  },
})

const Web3ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [currentAddress, setAddress] = useState("")
  const [nftContract, setNftContract] = useState(null)

  const values = {
    contracts: {
      nft: {
        nftContract: nftContract,
        setNftContract: setNftContract,
      },
    },
    accounts: {
      currentAddress: currentAddress,
      setAddress: setAddress,
    },
    interface: {
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

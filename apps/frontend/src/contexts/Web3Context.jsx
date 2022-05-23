import { ethers } from "ethers"
import { createContext, useContext, useState } from "react"

const web3Context = createContext({
  functions: {
    initialiseEthers: null,
  },
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

  const initialiseEthers = async () => {
    if (typeof window.ethereum.isMetaMask === undefined) {
      console.log("MetaMask not installed!")
      return
    }

    try {
      let tmpProvider = provider

      if (!tmpProvider) {
        tmpProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tmpProvider)

        await tmpProvider.send("eth_requestAccounts", [])

        const tmpSigner = tmpProvider.getSigner()
        setSigner(tmpSigner)

        const tmpAddress = await tmpSigner.getAddress()
        setAddress(tmpAddress)
      }
    } catch (error) {
      console.log(error)
      return
    }
  }

  const values = {
    functions: {
      initialiseEthers: initialiseEthers,
    },
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

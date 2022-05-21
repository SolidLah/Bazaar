import { ethers } from "ethers"
import { createContext, useContext, useState } from "react"

const web3Context = createContext()

const Web3ContextProvider = ({ children }) => {
  const [currentAddress, setAddress] = useState("")
  const [nftContract, setNftContract] = useState()

  const withMetamaskConnection = (next) => {
    return async () => {
      if (!window.ethereum) {
        console.log("Metamask not installed!")
        return
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()

        await next(provider, signer)

        return
      } catch (error) {
        console.log(error)
        return
      }
    }
  }

  const values = {
    functions: {
      withMetamaskConnection: withMetamaskConnection,
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
  }

  return <web3Context.Provider value={values}>{children}</web3Context.Provider>
}

const useWeb3Context = () => {
  return useContext(web3Context)
}

export { Web3ContextProvider, useWeb3Context }

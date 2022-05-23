import { ethers } from "ethers"
import { createContext, useContext, useState } from "react"
import { NFTContractData } from "../contractData"

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
  const [currentAddress, setAddress] = useState("")
  const [nftContract, setNftContract] = useState(null)
  const [initialised, setInitialised] = useState(false)

  const initialiseEthers = async () => {
    if (typeof window.ethereum.isMetaMask === undefined) {
      console.log("MetaMask not installed!")
      return
    }

    try {
      let tmpProvider = provider

      if (!tmpProvider) {
        // ethers globals
        tmpProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tmpProvider)

        await tmpProvider.send("eth_requestAccounts", [])

        const tmpSigner = tmpProvider.getSigner()
        setSigner(tmpSigner)

        const tmpAddress = await tmpSigner.getAddress()
        setAddress(tmpAddress)

        // initialise contracts
        const tmpContract = new ethers.Contract(
          NFTContractData.address,
          NFTContractData.abi,
          tmpSigner
        )
        setNftContract(tmpContract)
      }

      setInitialised(true)
    } catch (error) {
      console.log("Ethers initialisation error: " + error)
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

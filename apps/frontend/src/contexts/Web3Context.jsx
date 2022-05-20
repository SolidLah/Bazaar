import { createContext, useContext, useState } from "react"

const web3Context = createContext()

const Web3ContextProvider = ({ children }) => {
  const [currentAddress, setAddress] = useState("")
  const [nftContract, setNftContract] = useState()

  return (
    <web3Context.Provider
      value={{
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
      }}
    >
      {children}
    </web3Context.Provider>
  )
}

const useWeb3Context = () => {
  return useContext(web3Context)
}

export { Web3ContextProvider, useWeb3Context }

import { createContext, useContext, useReducer } from "react"
import { web3Reducer, getEthersState } from "../functions/web3"

const initialState = {
  nftContract: null,
  mktContract: null,
  address: null,
  ethersInitialised: false,
  provider: null,
  signer: null,
}

const web3Context = createContext({
  state: null,
  initialiseEthers: null,
})

const Web3ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(web3Reducer, initialState)

  const initialiseEthers = async () => {
    const ethersState = await getEthersState()
    dispatch(ethersState)
  }

  const values = {
    state,
    initialiseEthers,
  }

  return <web3Context.Provider value={values}>{children}</web3Context.Provider>
}

const useWeb3Context = () => {
  return useContext(web3Context)
}

export { Web3ContextProvider, useWeb3Context }

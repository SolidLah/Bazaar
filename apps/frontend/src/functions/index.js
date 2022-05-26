import { ethers } from "ethers"
import { NFTContractData, MarketplaceContractData } from "../contractData"

const toWei = (num) => ethers.utils.parseEther(num.toString())
const toEth = (num) => ethers.utils.formatEther(num)

const getEthersState = async () => {
  if (typeof window.ethereum === "undefined") {
    console.log("MetaMask not installed!")
    return
  }

  const currProvider = new ethers.providers.Web3Provider(window.ethereum)
  await currProvider.send("eth_requestAccounts", [])
  const currSigner = currProvider.getSigner()
  const currAddress = await currSigner.getAddress()

  const currNftContract = new ethers.Contract(
    NFTContractData.address,
    NFTContractData.abi,
    currSigner
  )

  const currMktContract = new ethers.Contract(
    MarketplaceContractData.address,
    MarketplaceContractData.abi,
    currSigner
  )

  return {
    currProvider,
    currSigner,
    currAddress,
    currNftContract,
    currMktContract,
  }
}

export { getEthersState, toWei, toEth }

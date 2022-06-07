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
    currNftContract,
    currMktContract,
    currAddress,
    currProvider,
    currSigner,
  }
}

const web3Reducer = (state, action) => {
  const {
    currNftContract,
    currMktContract,
    currAddress,
    currProvider,
    currSigner,
  } = action

  return {
    ...state,
    nftContract: currNftContract,
    mktContract: currMktContract,
    address: currAddress,
    ethersInitialised: true,
    provider: currProvider,
    signer: currSigner,
  }
}

const mintNFT = async ({ nftContract, uri }) => {
  await (await nftContract.mint(uri)).wait()

  const currTokenId = await nftContract.getCurrentId()
  console.log("currTokenId: " + currTokenId)

  return currTokenId
}

const listNFT = async ({ mktContract, tokenId, price }) => {
  await (
    await mktContract.createMarketItem(
      NFTContractData.address,
      tokenId,
      toWei(price)
    )
  ).wait()
}

export { getEthersState, web3Reducer, toWei, toEth, mintNFT, listNFT }

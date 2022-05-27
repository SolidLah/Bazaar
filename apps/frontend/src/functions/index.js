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

const mintNFT = async ({ nftContract, uri }) => {
  try {
    nftContract.on("Minted", (name, symbol, tokenId, tokenURI) => {
      console.log("[event listener] Minted", {
        name,
        symbol,
        tokenId: tokenId.toNumber(),
        tokenURI,
      })
    })

    await (await nftContract.mint(uri)).wait()

    const currTokenId = await nftContract.getCurrentId()
    console.log("currTokenId: " + currTokenId)

    nftContract.removeAllListeners("Minted")

    return currTokenId
  } catch (error) {
    console.log("[NFT minting error]", error)
  }
}

const listNFT = async ({ marketplaceContract, tokenId, price }) => {
  if (price <= 0) {
    alert("Price must be greater than zero")
    return
  }

  try {
    marketplaceContract.on(
      "MarketItemCreated",
      (itemId, nftAddress, tokenId, price, seller) => {
        console.log("[event listener] MarketItemCreated", {
          itemId: itemId.toString(),
          nftAddress,
          tokenId: tokenId.toString(),
          price,
          seller,
        })
      }
    )

    await (
      await marketplaceContract.createMarketItem(
        NFTContractData.address,
        tokenId,
        toWei(Number(price))
      )
    ).wait()

    marketplaceContract.removeAllListeners("MarketItemCreated")
  } catch (error) {
    console.log("[NFT listing error]", error)
  }
}

export { getEthersState, toWei, toEth, mintNFT, listNFT }

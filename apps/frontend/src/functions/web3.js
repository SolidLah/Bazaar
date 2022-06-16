import { ethers } from "ethers"
import { NFTContractData } from "../contractData"

const toWei = (num) => ethers.utils.parseEther(num.toString())
const toEth = (num) => ethers.utils.formatEther(num)

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

export { toWei, toEth, mintNFT, listNFT }

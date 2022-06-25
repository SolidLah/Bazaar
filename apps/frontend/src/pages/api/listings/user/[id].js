import { ethers } from "ethers"
import { NFTContractData, MarketplaceContractData } from "src/contractData"
import axios from "axios"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.MATIC_VIGIL_URL
      )

      const mktContractReader = new ethers.Contract(
        MarketplaceContractData.address,
        MarketplaceContractData.abi,
        provider
      )

      const nftContractReader = new ethers.Contract(
        NFTContractData.address,
        NFTContractData.abi,
        provider
      )

      let userListings = await mktContractReader.fetchUserItems(id)
      userListings = await Promise.all(
        userListings.map(async (item) => {
          const marketPrice = await mktContractReader.getTotalPriceForItem(
            item.itemId
          )
          const marketPriceObj = {
            display: ethers.utils.formatEther(marketPrice),
            biggish: marketPrice,
          }
          const nftURI = await nftContractReader.tokenURI(item.tokenId)
          const nftMetadata = (await axios.get(nftURI)).data

          return {
            id: item.itemId.toNumber(),
            marketData: item,
            marketPrice: marketPriceObj,
            nftData: nftMetadata,
          }
        })
      )

      let userNFTs = await nftContractReader.fetchUserNFTs(id)
      userNFTs = await Promise.all(
        userNFTs.map(async (url) => (await axios.get(url)).data)
      )

      const userCollection = { userListings, userNFTs }

      res.status(200).json({
        route: `api/listings/user/${id}`,
        success: true,
        msg: userCollection,
      })
    } catch (error) {
      res
        .status(500)
        .json({ route: `api/listings/user/${id}`, success: false, msg: error })
    }
  }
}

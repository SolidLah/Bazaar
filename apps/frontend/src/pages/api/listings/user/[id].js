import { ethers } from "ethers"
import { NFTContractData, MarketplaceContractData } from "src/contractData"

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

      const userItems = await mktContractReader.fetchUserItems(id)
      const userNFTs = await nftContractReader.fetchUserNFTs(id)
      const userCollection = { userItems, userNFTs }

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

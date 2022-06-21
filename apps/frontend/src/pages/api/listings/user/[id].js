import { ethers, BigNumber } from "ethers"
import { NFTContractData, MarketplaceContractData } from "src/contractData"

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === "GET") {
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

      /* struct MarketItem {
          uint256 itemId;
          address nftAddress;
          uint256 tokenId;
          uint256 price;
          address payable seller;
          bool sold;
        } */

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

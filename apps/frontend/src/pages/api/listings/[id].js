import { ethers } from "ethers"
import { NFTContractData, MarketplaceContractData } from "src/contractData"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query

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
      const marketItem = await mktContractReader.getMarketItem(id)
      const marketPrice = ethers.utils.formatEther(
        await mktContractReader.getTotalPriceForItem(id)
      )
      const nftURI = await nftContractReader.tokenURI(marketItem[2])
      const nftMetadata = await (await fetch(nftURI)).json()
      const nftRes = {
        marketData: marketItem,
        marketPrice,
        nftData: nftMetadata,
      }

      res
        .status(200)
        .json({ route: `api/listings/${id}`, success: true, msg: nftRes })
    } catch (error) {
      res
        .status(500)
        .json({ route: `api/listings/${id}`, success: false, msg: error })
    }
  }
}

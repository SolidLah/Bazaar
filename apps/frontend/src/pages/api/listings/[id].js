import { ethers, BigNumber } from "ethers";
import { NFTContractData, MarketplaceContractData } from "src/contracts";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.MATIC_VIGIL_URL
      );

      const mktContractReader = new ethers.Contract(
        MarketplaceContractData.address,
        MarketplaceContractData.abi,
        provider
      );

      const nftContractReader = new ethers.Contract(
        NFTContractData.address,
        NFTContractData.abi,
        provider
      );

      /* struct MarketItem {
          uint256 itemId;
          address nftAddress;
          uint256 tokenId;
          uint256 price;
          address payable seller;
          bool sold;
        } */
      const idBiggish = BigNumber.from(id);
      const marketItem = await mktContractReader.getMarketItem(idBiggish);
      const marketPrice = await mktContractReader.getTotalPriceForItem(
        idBiggish
      );
      const marketPriceObj = {
        display: ethers.utils.formatEther(marketPrice),
        biggish: marketPrice,
      };
      const nftURI = await nftContractReader.tokenURI(marketItem.tokenId);
      const nftMetadata = await (await fetch(nftURI)).json();
      const nftRes = {
        id,
        marketData: marketItem,
        marketPrice: marketPriceObj,
        nftData: nftMetadata,
      };

      res
        .status(200)
        .json({ route: `api/listings/${id}`, success: true, msg: nftRes });
    } catch (error) {
      res
        .status(500)
        .json({ route: `api/listings/${id}`, success: false, msg: error });
    }
  }
}

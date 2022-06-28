import { ethers } from "ethers";
import { NFTContractData, MarketplaceContractData } from "src/contracts";

export default async function handler(req, res) {
  if (req.method === "GET") {
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

      let listOfMarketItems = await mktContractReader.fetchMarketItems();

      listOfMarketItems = await Promise.all(
        listOfMarketItems.map(async (marketItem) => {
          const itemId = marketItem[0];
          const itemIdNumber = itemId.toNumber();
          const marketPrice = await mktContractReader.getTotalPriceForItem(
            itemId
          );
          const marketPriceObj = {
            display: ethers.utils.formatEther(marketPrice),
            biggish: marketPrice,
          };
          const nftURI = await nftContractReader.tokenURI(marketItem[2]);
          const nftMetadata = await (await fetch(nftURI)).json();

          return {
            id: itemIdNumber,
            marketData: marketItem,
            marketPrice: marketPriceObj,
            nftData: nftMetadata,
          };
        })
      );
      res.status(200).json({
        route: "api/listings/",
        success: true,
        msg: listOfMarketItems,
      });
    } catch (error) {
      res
        .status(500)
        .json({ route: "api/listings/", success: false, msg: error });
    }
  }
}

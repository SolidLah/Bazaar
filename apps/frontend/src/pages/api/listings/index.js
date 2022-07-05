import { ethers } from "ethers";
import { MarketplaceContractData } from "src/contracts";
import { formatItem } from "src/lib/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.MATIC_VIGIL_RPC
      );

      const mktContractReader = new ethers.Contract(
        MarketplaceContractData.address,
        MarketplaceContractData.abi,
        provider
      );

      let listOfMarketItems = await mktContractReader.fetchMarketItems();
      listOfMarketItems = await Promise.all(
        listOfMarketItems.map(async (item) => formatItem(item))
      );

      console.log(listOfMarketItems);

      res.status(200).json({
        route: "api/listings/",
        success: true,
        msg: listOfMarketItems,
      });
    } catch (error) {
      console.log("help", error);
      res
        .status(500)
        .json({ route: "api/listings/", success: false, msg: error });
    }
  }
}

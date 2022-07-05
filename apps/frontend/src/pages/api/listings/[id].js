import { ethers } from "ethers";
import { MarketplaceContractData } from "src/contracts";
import { formatItem } from "src/lib/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.MORALIS_RPC
      );

      const mktContractReader = new ethers.Contract(
        MarketplaceContractData.address,
        MarketplaceContractData.abi,
        provider
      );

      let item = await mktContractReader.marketItemsMapping(id);
      item = await formatItem(item);

      console.log(item);

      res
        .status(200)
        .json({ route: `api/listings/${id}`, success: true, msg: item });
    } catch (error) {
      res
        .status(500)
        .json({ route: `api/listings/${id}`, success: false, msg: error });
    }
  }
}

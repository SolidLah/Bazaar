import { ethers } from "ethers";
import { MarketplaceContractData } from "src/contracts";
import { formatItem } from "src/lib/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.MATIC_VIGIL_RPC
      );

      const mktContractReader = new ethers.Contract(
        MarketplaceContractData.address,
        MarketplaceContractData.abi,
        provider
      );

      let userItems = await mktContractReader.fetchUserItems(id);
      let listed = await Promise.all(
        userItems.listed.map(async (item) => formatItem(item))
      );
      let owned = await Promise.all(
        userItems.owned.map(async (item) => formatItem(item))
      );
      userItems = {
        listed,
        owned,
      };

      console.log(userItems);

      res.status(200).json({
        route: `api/listings/user/${id}`,
        success: true,
        msg: userItems,
      });
    } catch (error) {
      res
        .status(500)
        .json({ route: `api/listings/user/${id}`, success: false, msg: error });
    }
  }
}

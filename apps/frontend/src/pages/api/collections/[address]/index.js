import { getCollectionInfo, getCollectionListed } from "src/lib/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    try {
      const promises = [
        getCollectionInfo(address),
        getCollectionListed(address),
      ];
      const [info, listed] = await Promise.all(promises);

      const collection = {
        info,
        listed,
      };

      res.status(200).json({
        route: `api/collections/${address}`,
        success: true,
        msg: collection,
      });
    } catch (error) {
      res.status(500).json({
        route: `api/collections/${address}`,
        success: false,
        msg: error,
      });
    }
  }
}

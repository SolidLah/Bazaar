import getCollectionInfo from "src/lib/helpers/getCollectionInfo";
import getCollectionListed from "src/lib/helpers/getCollectionListed";
import getCollectionUnlisted from "src/lib/helpers/getCollectionUnlisted";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    try {
      const promises = [
        getCollectionInfo(address),
        getCollectionListed(address),
        getCollectionUnlisted(address),
      ];
      const [info, listed, unlisted] = await Promise.all(promises);

      const collection = {
        info,
        listed,
        unlisted,
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

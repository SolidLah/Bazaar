import getCollectionUnlisted from "src/lib/helpers/getCollectionUnlisted";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    try {
      const unlisted = await getCollectionUnlisted(address);

      res.status(200).json({
        route: `api/collections/${address}`,
        success: true,
        msg: unlisted,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        route: `api/collections/${address}`,
        success: false,
        msg: error,
      });
    }
  }
}

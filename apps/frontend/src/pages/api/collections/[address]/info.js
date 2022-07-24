import getCollectionInfo from "src/lib/helpers/getCollectionInfo";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    try {
      const info = await getCollectionInfo(address);

      res.status(200).json({
        route: `api/collections/${address}`,
        success: true,
        msg: info,
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

import getCollectionListed from "src/lib/helpers/getCollectionListed";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    try {
      const listed = await getCollectionListed(address);

      res.status(200).json({
        route: `api/collections/${address}`,
        success: true,
        msg: listed,
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

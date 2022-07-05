import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { watchlist } = req.query;

      console.log(watchlist);

      watchlist = await Promise.all(
        watchlist.map(
          async (id) => (await axios.get(`/api/listings/${id}`)).data.msg
        )
      );

      res.status(200).json({
        route: "api/listings/watchlist",
        success: true,
        msg: watchlist,
      });
    } catch (error) {
      res
        .status(500)
        .json({ route: "api/listings/watchlist", success: false, msg: error });
    }
  }
}

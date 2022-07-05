import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { uid } = req.query;

    try {
      const watchlistArray = (await getDoc(doc(db, "users", uid))).get(
        "watchlist"
      );

      console.log(watchlistArray);

      const watchlist = await Promise.all(
        watchlistArray.map((id) =>
          axios.get(`/api/listings/${id}`).then((res) => res.data.msg)
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

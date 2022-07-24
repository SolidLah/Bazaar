import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default async function addToWatchlist(uid, itemId) {
  await updateDoc(doc(db, "users", uid), {
    watchlist: arrayUnion(itemId),
  });
}

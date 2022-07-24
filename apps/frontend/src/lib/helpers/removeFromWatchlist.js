import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default async function removeFromWatchList(uid, itemId) {
  await updateDoc(doc(db, "users", uid), {
    watchlist: arrayRemove(itemId),
  });
}

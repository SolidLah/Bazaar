import { db } from "src/lib/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

export default async function addToWatchList({ uid, itemId }) {
  await updateDoc(doc(db, "users", uid), {
    watchlist: arrayRemove(itemId),
  });
}

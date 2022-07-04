import { db } from "src/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default async function addToWatchList({ uid, itemId }) {
  await updateDoc(doc(db, "users", uid), {
    watchlist: arrayUnion(itemId),
  });
}

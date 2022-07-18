import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default async function followUser(myUid, otherUid) {
  await updateDoc(doc(db, "users", myUid), {
    following: arrayRemove(otherUid),
  });
}

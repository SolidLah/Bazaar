import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default async function followUser(myUid, otherUid) {
  if (myUid === otherUid) throw new Error("Cannot follow yourself");

  await updateDoc(doc(db, "users", myUid), {
    following: arrayUnion(otherUid),
  });
}

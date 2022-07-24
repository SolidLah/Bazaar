import { db } from "src/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateUserDetail(uid, updatedFields) {
  await updateDoc(doc(db, "users", uid), updatedFields);
}

import { updateDoc } from "firebase/firestore";
import { isEmpty } from "lodash";
import { db } from "../firebase";

export default async function updateUserDetails(uid, fields = {}) {
  let updatedFields = {};
  if (fields?.name) updatedFields.name = fields?.name;
  if (fields?.email) updatedFields.email = fields?.email;
  if (fields?.walletAddress)
    updatedFields.walletAddress = fields?.walletAddress;

  if (isEmpty(updatedFields)) throw new Error("Missing fields");

  await updateDoc(doc(db, "users", uid), updatedFields);
}

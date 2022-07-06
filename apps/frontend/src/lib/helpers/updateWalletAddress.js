import { db } from "src/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateWalletAddress({ uid, walletAddress }) {
  await updateDoc(doc(db, "users", uid), {
    walletAddress,
  });
}

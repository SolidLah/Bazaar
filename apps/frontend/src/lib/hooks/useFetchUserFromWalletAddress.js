import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export default function useFetchUserFromWalletAddress(address) {
  const [values, loading, error] = useCollectionData(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const data =
    values && address
      ? values.filter((user) => user.walletAddress === address)[0]
      : null;

  return { data, loading, error };
}

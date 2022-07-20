import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export default function useAllUsers() {
  const [values, loading, error] = useCollectionData(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return { values, loading, error };
}

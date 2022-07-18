import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "src/lib/firebase";

export default function useFirestoreUidData(uid) {
  const docRef = uid ? doc(db, "users", uid) : null;
  const [data, loading, error] = useDocument(docRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return { data, loading, error };
}

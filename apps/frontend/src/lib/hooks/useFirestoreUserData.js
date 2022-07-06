import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "src/lib/firebase";

export default function useFirestoreUserData(user) {
  const docRef = useMemo(
    () => (user ? doc(db, "users", user.uid) : null),
    [user]
  );
  const [userData, loading, error] = useDocument(docRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return { userData, loading, error };
}

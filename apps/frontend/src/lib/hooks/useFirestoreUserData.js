import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db, auth } from "src/lib/firebase";
import { useMemo } from "react";

export default function useFirestoreUserData() {
  const [user, authLoading, authError] = useAuthState(auth);
  const [userData, docLoading, docError] = useDocument(
    doc(db, "users", user.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const error = useMemo(() => authError && docError, [authError, docError]);
  const loading = useMemo(
    () => authLoading && docLoading,
    [authLoading, docLoading]
  );

  return { user, userData, loading, error };
}

import { collection } from "firebase/firestore";
import { useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { userContext } from "src/contexts/userContext";
import { db } from "../firebase";

export default function useAllUsers(opts = { includeSelf: true }) {
  const { uid } = useContext(userContext);
  let [values, loading, error] = useCollectionData(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (!opts.includeSelf) {
    values = values?.filter((user) => user.uid !== uid);
  }

  return { values, loading, error };
}

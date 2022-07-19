import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export default function useFetchFollowing(followingArray) {
  const [values, loading, error] = useCollectionData(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const data =
    values && followingArray
      ? values.filter((user) => followingArray.includes(user.uid))
      : null;

  return { data, loading, error };
}

import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import useSWR from "swr";
import ListingDetailsElement from "./ListingDetailsElement";

const ListingDetailsPage = ({ id }) => {
  const [user] = useAuthState(auth);
  const { data: item, error } = useSWR(`/api/listings/${id}`, (url) =>
    axios.get(url).then((res) => res.data.msg)
  );

  return <ListingDetailsElement user={user} item={item} error={error} />;
};

export default ListingDetailsPage;

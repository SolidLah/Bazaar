import axios from "axios";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LoadingLayout from "src/components/common/layouts/LoadingLayout";
import { auth } from "src/lib/firebase";
import useSWR from "swr";
import ListingDetailsElement from "./ListingDetailsElement";

const ListingDetailsPage = ({ id }) => {
  const [user] = useAuthState(auth);
  const { data: item, error } = useSWR(`/api/listings/${id}`, (url) =>
    axios.get(url).then((res) => res.data.msg)
  );

  const active = useMemo(() => (item ? item.active : null), [item]);

  if (!item && !error) {
    return <LoadingLayout />;
  }

  if (error) {
    return <ErrorLayout />;
  }

  return <ListingDetailsElement user={user} item={item} active={active} />;
};

export default ListingDetailsPage;

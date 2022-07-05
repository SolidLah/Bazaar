import axios from "axios";
import useSWR from "swr";
import ListingDetailsElement from "./ListingDetailsElement";

const ListingDetails = ({ id }) => {
  const { data: item, error } = useSWR(`/api/listings/${id}`, (url) =>
    axios.get(url).then((res) => res.data.msg)
  );

  return <ListingDetailsElement item={item} error={error} />;
};

export default ListingDetails;

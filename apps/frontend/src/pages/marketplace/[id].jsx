import { useRouter } from "next/router";
import ListingDetailsPage from "src/components/modules/ListingDetailsPage/ListingDetailsPage";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ListingDetailsPage id={id} />;
};

export default Details;

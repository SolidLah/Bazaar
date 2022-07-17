import { useRouter } from "next/router";
import CollectionDetailsPage from "src/components/modules/CollectionDetailsPage/CollectionDetailsPage";

const Collection = () => {
  const router = useRouter();
  const { address } = router.query;

  return <CollectionDetailsPage address={address} />;
};

export default Collection;

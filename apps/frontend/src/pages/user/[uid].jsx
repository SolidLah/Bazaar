import { useRouter } from "next/router";
import UserProfilePage from "src/components/modules/UserProfilePage/UserProfilePage";

const Details = () => {
  const router = useRouter();
  const { uid } = router.query;

  return <UserProfilePage uid={uid} />;
};

export default Details;

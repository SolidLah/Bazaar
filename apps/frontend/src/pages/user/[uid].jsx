import { useRouter } from "next/router";
import ProtectedRouteLayout from "src/components/common/layouts/ProtectedRouteLayout";
import UserProfilePage from "src/components/modules/UserProfilePage/UserProfilePage";

const Details = () => {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <ProtectedRouteLayout>
      <UserProfilePage uid={uid} />
    </ProtectedRouteLayout>
  );
};

export default Details;

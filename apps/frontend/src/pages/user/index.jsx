import ProtectedRouteLayout from "src/components/common/layouts/ProtectedRouteLayout";
import UserProfilePage from "src/components/modules/UserProfilePage/UserProfilePage";

const User = () => {
  return (
    <ProtectedRouteLayout>
      <UserProfilePage />
    </ProtectedRouteLayout>
  );
};

export default User;

import ProtectedRoute from "src/components/common/layouts/ProtectedRoute";
import UserProfilePage from "src/components/modules/UserProfilePage/UserProfilePage";

const User = () => {
  return (
    <ProtectedRoute>
      <UserProfilePage />
    </ProtectedRoute>
  );
};

export default User;

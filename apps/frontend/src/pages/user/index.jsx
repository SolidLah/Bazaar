import ProtectedRoute from "src/components/common/layouts/ProtectedRoute";
import UserProfile from "src/components/modules/UserProfile/UserProfile";

const User = () => {
  return (
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  );
};

export default User;

import { auth } from "src/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginForm from "src/components/modules/LoginForm/LoginForm";
import UserProfile from "src/components/modules/UserProfile/UserProfile";

const User = () => {
  const [user, loading, error] = useAuthState(auth);

  return user && !loading ? <UserProfile /> : <LoginForm />;
};

export default User;

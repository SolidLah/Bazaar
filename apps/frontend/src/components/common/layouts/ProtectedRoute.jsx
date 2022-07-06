import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import LoadingLayout from "./LoadingLayout";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (!user && !loading) {
    router.push("/user/login");
  }

  return loading ? <LoadingLayout /> : <>{children}</>;
};

export default ProtectedRoute;

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import LoadingLayout from "./LoadingLayout";

const ProtectedRouteLayout = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (!user && !loading) {
    router.push({
      pathname: "/user/login",
      query: { from: router.pathname },
    });
  }

  return loading ? <LoadingLayout /> : <>{children}</>;
};

export default ProtectedRouteLayout;

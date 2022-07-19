import { useRouter } from "next/router";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import LoadingLayout from "./LoadingLayout";

const ProtectedRouteLayout = ({ children }) => {
  const router = useRouter();
  const { authState } = useContext(userContext);
  const [user, loading] = authState;

  if (!user && !loading) {
    router.push({
      pathname: "/user/login",
      query: { from: router.asPath },
    });
  }

  return loading ? <LoadingLayout /> : <>{children}</>;
};

export default ProtectedRouteLayout;

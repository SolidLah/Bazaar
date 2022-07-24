import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import { useLoginRedirect } from "src/lib/hooks";
import LoadingLayout from "./LoadingLayout";

const ProtectedRouteLayout = ({ children }) => {
  const { authState } = useContext(userContext);
  const [user, loading] = authState;
  const loginRedirect = useLoginRedirect();

  if (!user && !loading) {
    loginRedirect();
  }

  return loading ? <LoadingLayout /> : <>{children}</>;
};

export default ProtectedRouteLayout;

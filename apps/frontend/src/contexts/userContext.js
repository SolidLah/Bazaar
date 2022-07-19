import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import { useFirestoreUserData } from "src/lib/hooks";

const userContext = createContext({
  authState: null,
  uid: null,
  firestoreHook: null,
});

const UserProvider = ({ children }) => {
  const authState = useAuthState(auth);
  const [user] = authState;
  const uid = user ? user.uid : null;
  const firestoreHook = useFirestoreUserData(user);

  const value = {
    authState,
    uid,
    firestoreHook,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export { userContext, UserProvider };

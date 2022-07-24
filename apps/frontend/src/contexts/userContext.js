import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import VerifyEmailModal from "src/components/common/ui/VerifyEmailModal/VerifyEmailModal";
import { auth } from "src/lib/firebase";
import { useFirestoreUserData } from "src/lib/hooks";

const userContext = createContext({
  authState: null,
  user: null,
  uid: null,
  firestoreHook: null,
  data: null,
});

const UserProvider = ({ children }) => {
  const authState = useAuthState(auth);
  const [user] = authState;
  const uid = user ? user.uid : null;
  const email = user?.email;
  const emailVerified = user ? user.emailVerified : true;
  const firestoreHook = useFirestoreUserData(user);
  const { data } = firestoreHook;

  const value = {
    authState,
    user,
    uid,
    firestoreHook,
    data,
  };

  return (
    <userContext.Provider value={value}>
      {children}
      <VerifyEmailModal user={user} email={email} verified={emailVerified} />
    </userContext.Provider>
  );
};

export { userContext, UserProvider };

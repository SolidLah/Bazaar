import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import VerifyEmailModal from "src/components/common/ui/VerifyEmailModal/VerifyEmailModal";
import { auth } from "src/lib/firebase";
import { useFirestoreUserData } from "src/lib/hooks";

const userContext = createContext({
  authState: null,
  uid: null,
  emailVerified: null,
  firestoreHook: null,
});

const UserProvider = ({ children }) => {
  const authState = useAuthState(auth);
  const [user] = authState;
  const uid = user ? user.uid : null;
  const email = user?.email;
  const emailVerified = user ? user.emailVerified : true;
  const firestoreHook = useFirestoreUserData(user);

  const value = {
    authState,
    uid,
    emailVerified,
    firestoreHook,
  };

  return (
    <userContext.Provider value={value}>
      {children}
      <VerifyEmailModal user={user} email={email} verified={emailVerified} />
    </userContext.Provider>
  );
};

export { userContext, UserProvider };

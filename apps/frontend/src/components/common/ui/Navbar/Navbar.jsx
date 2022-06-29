import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import NavbarElement from "./NavbarElement";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return <NavbarElement user={user} />;
};

export default Navbar;

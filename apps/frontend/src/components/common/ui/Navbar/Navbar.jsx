import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import NavbarElement from "./NavbarElement";

const Navbar = () => {
  const { authState } = useContext(userContext);
  const [user] = authState;

  return <NavbarElement user={user} />;
};

export default Navbar;

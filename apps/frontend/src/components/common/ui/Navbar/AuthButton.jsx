import { Button } from "@chakra-ui/react";

const AuthButton = ({ user, logoutCallback, loginCallback }) => {
  return user ? (
    <Button
      onClick={logoutCallback}
      colorScheme="blackAlpha"
      variant="ghost"
      color="white"
    >
      Logout
    </Button>
  ) : (
    <Button
      onClick={loginCallback}
      colorScheme="blackAlpha"
      variant="ghost"
      color="white"
    >
      Login
    </Button>
  );
};

export default AuthButton;

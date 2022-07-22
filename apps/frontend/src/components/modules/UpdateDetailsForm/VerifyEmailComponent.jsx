import { Button } from "@chakra-ui/react";
import { sendEmailVerification } from "firebase/auth";
import { useToastedCallback } from "src/lib/hooks";

const VerifyEmailComponent = ({ user, ...props }) => {
  const sendEmail = async () => {
    await sendEmailVerification(user);
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Send email verification",
    sendEmail
  );
  return (
    <Button
      colorScheme="purple"
      onClick={toastedCallback}
      isLoading={loading}
      {...props}
    >
      Send verification email
    </Button>
  );
};

export default VerifyEmailComponent;

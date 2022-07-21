import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import PasswordInput from "src/components/common/ui/PasswordInput/PasswordInput";
import { auth } from "src/lib/firebase";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";

const PasswordComponent = () => {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const errorToast = useErrorToast("Update email");
  const successToast = useSuccessToast("Update email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const callBack = async () => {
    try {
      if (!password) throw new Error("Missing field");
      if (password !== confirm) throw new Error("Passwords are not the same");
      if (error) throw error;

      await updatePassword(password);
      successToast();
      setPassword("");
      setConfirm("");
    } catch (error) {
      console.log(error);
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <Flex direction="column" gap={1} w="md">
      <Heading size="md" mb={1}>
        Password
      </Heading>
      <PasswordInput
        placeholder="new password"
        onChange={handlePassword}
        value={password}
      />
      <PasswordInput
        placeholder="confirm password"
        onChange={handleConfirm}
        value={confirm}
      />
      <Button
        mt="0.5rem"
        alignSelf="flex-end"
        colorScheme="purple"
        onClick={callBack}
        w="max-content"
        isLoading={updating}
      >
        Change
      </Button>
    </Flex>
  );
};

export default PasswordComponent;

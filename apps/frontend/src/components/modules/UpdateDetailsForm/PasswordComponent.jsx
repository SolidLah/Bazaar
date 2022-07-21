import { Button, Flex, Heading } from "@chakra-ui/react";
import { updatePassword as fbUpdatePassword } from "firebase/auth";
import { useState } from "react";
import PasswordInput from "src/components/common/ui/PasswordInput/PasswordInput";
import { auth } from "src/lib/firebase";
import { useToastedCallback } from "src/lib/hooks";

const PasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const updatePassword = async () => {
    if (!password || !confirm) throw new Error("Missing fields");
    if (password !== confirm) throw new Error("Passwords are not the same");

    await fbUpdatePassword(auth.currentUser, password);
    setPassword("");
    setConfirm("");
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Update password",
    updatePassword
  );

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  return (
    <Flex direction="column" gap="0.3rem" w="md">
      <Heading size="md" mb="0.3rem">
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
        mt="0.3rem"
        alignSelf="flex-end"
        colorScheme="purple"
        onClick={toastedCallback}
        w="max-content"
        isLoading={loading}
      >
        Change
      </Button>
    </Flex>
  );
};

export default PasswordComponent;

import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { updateEmail as fbUpdateEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "src/lib/firebase";
import { updateUserDetail } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";

const EmailComponent = ({ uid, current }) => {
  const [email, setEmail] = useState("");

  const updateEmail = async () => {
    if (!uid) throw new Error("Not logged in");
    if (!email) throw new Error("Missing field");
    if (current === email) throw new Error("Same as current");

    await fbUpdateEmail(auth.currentUser, email);
    await updateUserDetail(uid, { email });

    setEmail("");
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Update email",
    updateEmail
  );

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Flex direction="column" gap="0.3rem" w="md">
      <Heading size="md" mb="0.3rem">
        Email
      </Heading>
      <Text>Current: {current}</Text>
      <Flex justify="space-between">
        <Input
          placeholder="new email"
          w="2xs"
          onChange={handleChange}
          value={email}
        />
        <Button
          colorScheme="purple"
          onClick={toastedCallback}
          w="max-content"
          isLoading={loading}
        >
          Change
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmailComponent;

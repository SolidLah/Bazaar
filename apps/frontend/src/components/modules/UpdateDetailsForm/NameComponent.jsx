import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { updateUserDetail } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";

const NameComponent = ({ uid, current }) => {
  const [name, setName] = useState("");

  const updateName = async () => {
    if (!uid) throw new Error("Not logged in");
    if (!name) throw new Error("Missing field");
    if (name === current) throw new Error("Same as current");

    await updateUserDetail(uid, { name });

    setName("");
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Update name",
    updateName
  );

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Flex direction="column" gap="0.3rem" w="md">
      <Heading size="md" mb="0.3rem">
        Name
      </Heading>
      <Text>Current: {current}</Text>
      <Flex justify="space-between">
        <Input
          placeholder="new name"
          w="2xs"
          onChange={handleChange}
          value={name}
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

export default NameComponent;

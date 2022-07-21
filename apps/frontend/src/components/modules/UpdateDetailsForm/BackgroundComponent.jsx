import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { storage } from "src/lib/firebase";
import { updateUserDetail } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";

const BackgroundComponent = ({ uid }) => {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const ref = storageRef(storage, `${uid}/background/${file.name}`);
    await uploadBytes(ref, file, { contentType: file.type });
    const url = await getDownloadURL(ref);
    return url;
  };

  const updateField = async (background) => {
    await updateUserDetail(uid, { background });
  };

  const updateBackground = async () => {
    if (!file) throw new Error("Missing field");

    const url = await uploadFile();
    await updateField(url);
    setFile(null);
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Update background picture",
    updateBackground
  );

  const handleChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <Flex direction="column" gap="0.3rem" w="md">
      <Heading size="md" mb="0.3rem">
        Background Picture
      </Heading>
      <Flex justify="space-between">
        <Input
          placeholder="new name"
          w="2xs"
          onChange={handleChange}
          type="file"
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

export default BackgroundComponent;

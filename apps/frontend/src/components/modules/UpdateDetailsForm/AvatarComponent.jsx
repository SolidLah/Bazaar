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

const AvatarComponent = ({ uid }) => {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const ref = storageRef(storage, `${uid}/avatar/${file.name}`);
    await uploadBytes(ref, file, { contentType: file.type });
    const url = await getDownloadURL(ref);
    return url;
  };

  const updateField = async (avatar) => {
    await updateUserDetail(uid, { avatar });
  };

  const updateAvatar = async () => {
    if (!file) throw new Error("Missing field");

    const url = await uploadFile();
    await updateField(url);
    setFile(null);
  };

  const deleteAvatar = async () => {
    await updateField({ avatar: "" });
    setFile(null);
  };

  const { toastedCallback: toastedUpdate, loading: loadingUpdate } =
    useToastedCallback("Update avatar", updateAvatar);

  const { toastedCallback: toastedDelete, loading: loadingDelete } =
    useToastedCallback("Delete avatar", deleteAvatar);

  const handleChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <Flex direction="column" gap="0.3rem" w="md">
      <Heading size="md" mb="0.3rem">
        Avatar
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
          onClick={toastedDelete}
          w="max-content"
          isLoading={loadingDelete}
        >
          Delete
        </Button>
        <Button
          colorScheme="purple"
          onClick={toastedUpdate}
          w="max-content"
          isLoading={loadingUpdate}
        >
          Change
        </Button>
      </Flex>
    </Flex>
  );
};

export default AvatarComponent;

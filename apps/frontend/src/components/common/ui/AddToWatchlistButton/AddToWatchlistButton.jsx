import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";
import { auth } from "src/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addToWatchList } from "src/lib/helpers";

const AddToWatchListButton = ({ item, ...props }) => {
  const [user] = useAuthState(auth);
  const errorToast = useErrorToast("Add to watchlist");
  const successToast = useSuccessToast("Add to watchlist");

  const buttonCallback = async () => {
    try {
      if (!user) {
        throw new Error("Not signed in");
      }

      await addToWatchList({ uid: user.uid, itemId: item.itemId });
      successToast();
    } catch (error) {
      console.log(error);
      errorToast({
        description: error.message,
      });
    }
  };

  return <IconButton icon={<StarIcon />} onClick={buttonCallback} {...props} />;
};

export default AddToWatchListButton;

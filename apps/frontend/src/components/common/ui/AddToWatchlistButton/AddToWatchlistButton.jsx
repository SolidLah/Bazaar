import { StarIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import { addToWatchlist, removeFromWatchlist } from "src/lib/helpers";
import {
  useErrorToast,
  useFirestoreUserData,
  useSuccessToast,
  useWatchlist,
} from "src/lib/hooks";

const AddToWatchListButton = ({ item, ...props }) => {
  const errorToast = useErrorToast("Add to watchlist");
  const successToast = useSuccessToast("Add to watchlist");
  const [user] = useAuthState(auth);
  const { userData } = useFirestoreUserData(user);
  const watchlistArray = useWatchlist(userData);

  const itemInWatchlist = useMemo(
    () => (watchlistArray ? watchlistArray.includes(item.itemId) : false),
    [watchlistArray, item]
  );

  const buttonCallback = async () => {
    try {
      if (!user) {
        throw new Error("Not signed in");
      }

      if (itemInWatchlist) {
        await removeFromWatchlist(user.uid, item.itemId);
        successToast({
          description: "Removed from watchlist",
        });
      } else {
        await addToWatchlist(user.uid, item.itemId);
        successToast({
          description: "Added to watchlist",
        });
      }
    } catch (error) {
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <IconButton
      icon={<StarIcon />}
      onClick={buttonCallback}
      isActive={itemInWatchlist}
      {...props}
    />
  );
};

export default AddToWatchListButton;

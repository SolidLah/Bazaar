import { StarIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { userContext } from "src/contexts/userContext";
import { addToWatchlist, removeFromWatchlist } from "src/lib/helpers";
import { useErrorToast, useSuccessToast, useWatchlist } from "src/lib/hooks";

const AddToWatchListButton = ({ item, ...props }) => {
  const errorToast = useErrorToast("Add to watchlist");
  const successToast = useSuccessToast("Add to watchlist");

  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { userData } = firestoreHook;
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

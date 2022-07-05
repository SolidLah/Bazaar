import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";
import { addToWatchlist, removeFromWatchlist } from "src/lib/helpers";
import { useFirestoreUserData, useWatchlist } from "src/lib/hooks";
import { useMemo } from "react";

const AddToWatchListButton = ({ item, ...props }) => {
  const errorToast = useErrorToast("Add to watchlist");
  const successToast = useSuccessToast("Add to watchlist");

  const { user, userData } = useFirestoreUserData();
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
        await removeFromWatchlist({ uid: user.uid, itemId: item.itemId });
        successToast({
          description: "Removed from watchlist",
        });
      } else {
        await addToWatchlist({ uid: user.uid, itemId: item.itemId });
        successToast({
          description: "Added to watchlist",
        });
      }
    } catch (error) {
      console.log(error);
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

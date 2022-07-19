import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import followUser from "src/lib/helpers/followUser";
import unfollowUser from "src/lib/helpers/unfollowUser";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";

const FollowButton = ({ uid, ...props }) => {
  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { data } = firestoreHook;
  const isFollowing = data ? data.following.includes(uid) : false;
  const successToast = useSuccessToast("Follow user");
  const errorToast = useErrorToast("Follow user");

  const buttonCallback = async () => {
    try {
      if (!user) throw new Error("Not signed in");

      if (isFollowing) {
        await unfollowUser(user.uid, uid);
        successToast({
          description: "Successfully unfollowed",
        });
      } else {
        await followUser(user.uid, uid);
        successToast({
          description: "Successfully followed",
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
    <Button onClick={buttonCallback} colorScheme="purple" {...props}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;

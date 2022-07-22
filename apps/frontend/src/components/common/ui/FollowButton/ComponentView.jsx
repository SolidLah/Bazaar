import { Button } from "@chakra-ui/react";

const ComponentView = ({ toastedCallback, loading, isFollowing, ...props }) => {
  return (
    <Button
      onClick={toastedCallback}
      isLoading={loading}
      colorScheme="purple"
      {...props}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default ComponentView;

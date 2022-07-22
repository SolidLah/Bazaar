import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const FollowButton = ({ uid, ...props }) => {
  const { toastedCallback, loading, isFollowing } = useComponentState(uid);

  return (
    <ComponentView
      toastedCallback={toastedCallback}
      loading={loading}
      isFollowing={isFollowing}
      {...props}
    />
  );
};

export default FollowButton;

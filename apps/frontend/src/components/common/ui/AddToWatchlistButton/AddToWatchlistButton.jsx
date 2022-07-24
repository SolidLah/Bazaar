import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const AddToWatchListButton = ({ item, ...props }) => {
  const { toastedCallback, loading, isOwner, itemInWatchlist } =
    useComponentState(item);

  return (
    <ComponentView
      toastedCallback={toastedCallback}
      loading={loading}
      itemInWatchlist={itemInWatchlist}
      isOwner={isOwner}
      {...props}
    />
  );
};

export default AddToWatchListButton;

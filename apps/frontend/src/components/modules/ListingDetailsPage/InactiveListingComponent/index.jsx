import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const InactiveListingComponent = ({ item, walletAddress }) => {
  const { toastedCallback, loading, price, handlePrice, isOwner } =
    useComponentState(item, walletAddress);

  return (
    <ComponentView
      callback={toastedCallback}
      loading={loading}
      price={price}
      handlePrice={handlePrice}
      isOwner={isOwner}
    />
  );
};

export default InactiveListingComponent;

import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const BuyButton = ({ item, ...props }) => {
  const { toastedCallback, loading } = useComponentState(item);

  return (
    <ComponentView callback={toastedCallback} loading={loading} {...props} />
  );
};

export default BuyButton;

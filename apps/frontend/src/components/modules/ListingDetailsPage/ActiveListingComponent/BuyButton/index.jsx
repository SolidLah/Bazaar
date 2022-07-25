import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const BuyButton = ({ item, data, ...props }) => {
  const { toastedCallback, loading } = useComponentState(item, data);

  return (
    <ComponentView callback={toastedCallback} loading={loading} {...props} />
  );
};

export default BuyButton;

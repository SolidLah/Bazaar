import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const CreateCollectionForm = () => {
  const { name, symbol, handleName, handleSymbol, loading, toastedCallback } =
    useComponentState();

  return (
    <ComponentView
      name={name}
      symbol={symbol}
      handleName={handleName}
      handleSymbol={handleSymbol}
      loading={loading}
      callback={toastedCallback}
    />
  );
};

export default CreateCollectionForm;

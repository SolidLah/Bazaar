import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const BatchMintForm = ({ address }) => {
  const hook = useComponentState(address);

  return <ComponentView {...hook} />;
};

export default BatchMintForm;

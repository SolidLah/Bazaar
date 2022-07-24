import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const SingleMintForm = ({ address }) => {
  const hook = useComponentState(address);

  return <ComponentView {...hook} />;
};

export default SingleMintForm;

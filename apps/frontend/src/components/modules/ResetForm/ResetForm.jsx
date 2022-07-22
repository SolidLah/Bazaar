import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const ResetForm = () => {
  const hook = useComponentState();

  return <ComponentView {...hook} />;
};
export default ResetForm;

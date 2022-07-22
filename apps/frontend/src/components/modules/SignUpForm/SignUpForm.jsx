import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const SignupForm = () => {
  const hook = useComponentState();

  return <ComponentView {...hook} />;
};

export default SignupForm;

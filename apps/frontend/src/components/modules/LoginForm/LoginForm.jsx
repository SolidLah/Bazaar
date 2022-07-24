import ComponentView from "./ComponentView";
import useComponentState from "./useComponentState";

const LoginForm = () => {
  // const {loading,toastedCallback,handlePassword,password,handleEmail,email} = useComponentState();
  const hook = useComponentState();

  return <ComponentView {...hook} />;
};

export default LoginForm;

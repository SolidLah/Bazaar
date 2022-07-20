import ProtectedRouteLayout from "src/components/common/layouts/ProtectedRouteLayout";
import UpdateDetailsForm from "src/components/modules/UpdateDetailsForm/UpdateDetailsForm";

const Update = () => {
  return (
    <ProtectedRouteLayout>
      <UpdateDetailsForm />
    </ProtectedRouteLayout>
  );
};

export default Update;

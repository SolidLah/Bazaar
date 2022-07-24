import ProtectedRouteLayout from "src/components/common/layouts/ProtectedRouteLayout";
import CreateCollectionForm from "src/components/modules/CreateCollectionForm/CreateCollectionForm";

const CreateCollection = () => {
  return (
    <ProtectedRouteLayout>
      <CreateCollectionForm />
    </ProtectedRouteLayout>
  );
};

export default CreateCollection;

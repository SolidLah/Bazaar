import { useRouter } from "next/router";
import ProtectedRouteLayout from "src/components/common/layouts/ProtectedRouteLayout";
import MintForm from "src/components/modules/MintForm/MintForm";

const Mint = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <ProtectedRouteLayout>
      <MintForm address={address} />
    </ProtectedRouteLayout>
  );
};

export default Mint;

import { useRouter } from "next/router";
import { useCallback } from "react";

export default function useLoginRedirect() {
  const router = useRouter();

  const loginRedirect = useCallback(() => {
    router.push({
      pathname: "/user/login",
      query: { from: router.pathname },
    });
  }, [router]);

  return loginRedirect;
}

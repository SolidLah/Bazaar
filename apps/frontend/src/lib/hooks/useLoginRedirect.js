import { useRouter } from "next/router";
import { useCallback } from "react";

export default function useLoginRedirect() {
  const router = useRouter();

  const loginRedirect = useCallback(() => {
    const path = router.pathname;

    if (path === "/user/login") {
      return;
    }

    router.push({
      pathname: "/user/login",
      query: { from: path },
    });
  }, [router]);

  return loginRedirect;
}

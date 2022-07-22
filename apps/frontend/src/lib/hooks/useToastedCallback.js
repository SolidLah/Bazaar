import { useCallback, useState } from "react";
import useErrorToast from "./useErrorToast";
import useSuccessToast from "./useSuccessToast";

export default function useToastedCallback(title, callBack, success = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const errorToast = useErrorToast(title);
  const successToast = useSuccessToast(title);

  const toastedCallback = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await callBack();
      if (success) successToast();
    } catch (error) {
      setError(error);
      errorToast({
        description: error.message,
      });
    }

    setLoading(false);
  }, [callBack, success, errorToast, successToast]);

  return { toastedCallback, loading, error };
}

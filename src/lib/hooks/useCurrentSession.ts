import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

// Define the type for the session state
type SessionState =
  | { session: Session; status: "authenticated" }
  | { session: null; status: "loading" };

// This hook doesn't rely on the session provider
export const useCurrentSession = () => {
  const [state, setState] = useState<SessionState>({
    session: null,
    status: "loading", // Set initial status as "loading"
  });

  const pathName = usePathname();
  const router = useRouter();

  const retrieveSession = useCallback(async () => {
    try {
      setState({ session: null, status: "loading" });
      const sessionData = await getSession();

      if (sessionData) {
        setState({ session: sessionData, status: "authenticated" });
        return;
      }

      // TODO: log
      router.push("/auth/login");
      // setState({ session: null, status: "unauthenticated" });
    } catch (error) {
      // TODO: log
      router.push("/auth/error");
      // setState({ session: null, status: "unauthenticated" });
    }
  }, [router]);

  useEffect(() => {
    retrieveSession();

    // use the pathname to force a re-render when the user navigates to a new page
  }, [retrieveSession, pathName]);

  return state;
};

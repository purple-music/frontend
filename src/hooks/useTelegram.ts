import type { WebApp as WebAppType } from "@twa-dev/types";
import { useEffect, useState } from "react";

export function useTelegram() {
  const [isWebApp, setIsWebApp] = useState(false);
  const [webApp, setWebApp] = useState<WebAppType | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // twa-dev uses window on import, so we need to use dynamic import
    import("@twa-dev/sdk").then((module) => {
      const WebApp = module.default;
      const isWebApp = WebApp?.initData !== undefined;
      setIsWebApp(isWebApp);
      setWebApp(isWebApp ? WebApp : null);
    });
  }, []);

  return {
    isWebApp,
    webApp,
    initData: webApp?.initData || null,
  };
}

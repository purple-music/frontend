import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

export function useTelegram() {
  const [isWebApp, setIsWebApp] = useState(false);

  useEffect(() => {
    setIsWebApp(
      typeof window !== "undefined" && WebApp?.initData !== undefined,
    );
  }, []);

  return {
    isWebApp,
    webApp: isWebApp ? WebApp : null,
    initData: isWebApp ? WebApp.initData : null,
  };
}

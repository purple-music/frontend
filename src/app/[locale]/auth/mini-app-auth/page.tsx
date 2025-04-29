"use client";

import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useLoginTelegramMutation from "@/api/mutations/auth/login-telegram";

export default function MiniAppAuth() {
  const router = useRouter();
  const { mutateAsync: login } = useLoginTelegramMutation();

  useEffect(() => {
    const handleAuth = async () => {
      if (WebApp.initData) {
        try {
          await login({ initData: WebApp.initData });
          router.push("/my");
        } catch (error) {
          WebApp.showAlert("Login failed");
        }
      }
    };

    WebApp.ready();
    handleAuth();
  }, [login, router]);

  return <div>Processing authentication...</div>;
}

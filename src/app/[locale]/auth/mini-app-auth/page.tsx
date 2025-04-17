"use client";

import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useLoginTelegramMutation from "@/api/mutations/auth/login-telegram";

export default function MiniAppAuth() {
  const router = useRouter();
  const loginMutation = useLoginTelegramMutation();

  useEffect(() => {
    if (WebApp.initData) {
      loginMutation.mutate(
        { initData: WebApp.initData },
        {
          onSuccess: async () => {
            WebApp.close();
            await router.push("/dashboard");
          },
          onError: () => {
            WebApp.showAlert("Login failed");
          },
        },
      );
    }
  }, [loginMutation, router]);

  return <div>Processing authentication...</div>;
}

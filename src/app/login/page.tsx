// pages/login.tsx
"use client";

import React, { useState } from "react";
import { loginUser } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const user = await loginUser(
        new FormData(event.target as HTMLFormElement),
      );
      setMessage("Login successful");
      localStorage.setItem("user", user.id);
      router.push("/");
    } catch (error) {
      setMessage("Login failed");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-2xl">Login</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full rounded border border-gray-300 p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Login
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
}

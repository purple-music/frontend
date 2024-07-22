// pages/login.tsx
"use client";

import React, { useState } from 'react';
import { loginUser } from '@/actions/actions';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const user = await loginUser(new FormData(event.target as HTMLFormElement));
      setMessage('Login successful');
      localStorage.setItem("user", user.id)
      router.push("/");
    } catch (error) {
      setMessage('Login failed');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
}

"use client";

import { useProfileQuery } from "@/api/queries/auth/profile";
import DashboardPage from "@/features/my/dashboard/DashboardPage/DashboardPage";

export default function Page() {
  // TODO: make user provider for all /my pages
  const { data: user, isLoading, isError, error } = useProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  if (!user) return <div>User not found</div>;

  return <DashboardPage user={user} />;
}

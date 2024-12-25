"use client";

import useTranslation from "next-translate/useTranslation";
import React from "react";

import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";

// function DashboardWrapper() {
//   const { session, status } = useCurrentSession();
//
//   const [bookings, setBookings] = useState<Booking[] | null>(null);
//   useEffect(() => {
//     if (!session) return;
//
//     getCurrentBookingsByUserId(session.user.id).then((response) =>
//       setBookings(response),
//     );
//   }, [session]);
//
//   if (status === "loading" || bookings === null) {
//     // TODO: add skeleton
//     return <span>TODO: Dashboard skeleton...</span>;
//   }
//
//   return <Dashboard bookings={bookings} />;
// }

export default function Page() {
  const { t } = useTranslation("my");
  return (
    <>
      <DashboardPage />
      {/*<PageWrapper title={t("dashboard.title")}>*/}
      {/*  <DashboardWrapper />*/}
      {/*</PageWrapper>*/}
    </>
  );
}

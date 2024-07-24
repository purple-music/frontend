"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser, fetchMyBookings } from "@/actions/actions";
import { Booking } from "@prisma/client";

function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user") || "";
    fetchMyBookings(userId).then((response) => setBookings(response));
  }, []);

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      console.log("Cancel");
      // await fetch(`/api/bookings/${bookingId}`, {
      //   method: "DELETE",
      // });
      // fetchBookings();
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Твои записи</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Studio</th>
              <th>Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={`${booking.hour}-${booking.studio}`}>
                <td>{booking.title}</td>
                <td>{booking.studio}</td>
                <td>{booking.hour}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit()}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="mx-auto flex flex-col gap-6 py-12">
      <h1 className="text-4xl font-bold">Дашборд</h1>
      <Dashboard />
    </div>
  );
}

import { getBookingsByUserId } from "@/actions/query/booking";
import { Booking } from "@prisma/client";
import { Session } from "next-auth";
import { useState, useEffect } from "react";

export function Dashboard({ session }: { session: Session }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    getBookingsByUserId(session.user.id).then((response) =>
      setBookings(response),
    );
  }, []);

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      console.log("Cancel");
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

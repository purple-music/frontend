import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { hourToDate } from "@/lib/utils/time";
import { groupBookingsByDay } from "@/lib/utils/bookings";
import { PseudoLine } from "@/components/pseudo-line";
import _ from "lodash";
import { StudioId } from "@/lib/types";
import { TbPencil, TbSquareRoundedMinus } from "react-icons/tb";

type GroupedBookings = {
  [date: string]: Booking[]; // Key is the date in yyyy-MM-dd format, value is array of bookings for that day
};

const getColor = (studio: StudioId) => {
  switch (studio) {
    case "blue":
      return "bg-blue-500";
    case "purple":
      return "bg-purple-500";
    case "orange":
      return "bg-orange-500";
  }
};

const getSoftColor = (studio: StudioId) =>
  ({
    blue: "bg-blue-300",
    purple: "bg-purple-300",
    orange: "bg-orange-300",
  })[studio];

export function Dashboard({ bookings }: { bookings: Booking[] }) {
  const groupedBookings = groupBookingsByDay(bookings);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {Object.entries(groupedBookings).map(([day, bookingsForDay]) => {
        const studioed = Object.groupBy(
          bookingsForDay,
          (booking) => booking.studio,
        );
        return (
          <div key={day} className="card bg-base-100 shadow-md">
            <div className="card-body">
              {/* TODO: use Luxon */}
              <h2 className="card-title">
                {new Date(day).toLocaleDateString("ru-RU", {
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <ul className="flex flex-col gap-4">
                {Object.entries(studioed).map(([studio, bookings]) => {
                  return (
                    bookings &&
                    bookings.length > 0 && (
                      <li
                        key={`${studio}_${bookings.map((b) => b.hour)}`}
                        className="flex flex-col gap-1"
                      >
                        <h3 className="text-xl">{studio}</h3>
                        <PseudoLine color={getColor(studio as StudioId)}>
                          <ul className="flex flex-col gap-1">
                            {bookings.map((b) => (
                              <li className="flex w-full flex-row items-center justify-between">
                                <span>
                                  {format(hourToDate(b.hour), "p", {
                                    locale: ru,
                                  })}
                                </span>
                                <div className="flex flex-row items-center justify-end gap-1">
                                  <button className="btn btn-square btn-xs">
                                    <TbPencil />
                                  </button>
                                  <button className="btn btn-square btn-error btn-xs">
                                    <TbSquareRoundedMinus />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </PseudoLine>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );

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
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
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

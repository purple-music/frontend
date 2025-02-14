import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { TbPencil, TbSquareRoundedMinus } from "react-icons/tb";

import PseudoLine from "@/components/ui/PseudoLine/PseudoLine";
import { StudioId } from "@/lib/types";
import { groupBookingsByDay } from "@/lib/utils/bookings";
import { hourToDate } from "@/lib/utils/time";

type Booking = {
  id: number;
  slotTime: Date;
  peopleCount: number;
  createdAt: Date;
  updatedAt: Date;
  studioId: string;
  orderId: number;
};

// TODO: prisma removed

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
          (booking) => booking.studioId,
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
                        key={`${studio}_${bookings.map((b) => b.slotTime)}`}
                        className="flex flex-col gap-1"
                      >
                        <h3 className="text-xl">{studio}</h3>
                        <PseudoLine color={getColor(studio as StudioId)}>
                          <ul className="flex flex-col gap-1">
                            {bookings.map((b) => (
                              <li
                                className="flex w-full flex-row items-center justify-between"
                                key={b.slotTime.getTime()}
                              >
                                <span>
                                  {format(b.slotTime, "p", {
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
}

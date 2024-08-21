import { Table } from "@/components/table/table";
import { TableCell } from "@/components/table/table-cell";
import { TableContent } from "@/components/table/table-content";
import { TableContentColumn } from "@/components/table/table-content-column";
import { TablePrefix } from "@/components/table/table-prefix";
import { TableTimeColumn } from "@/components/table/table-time-column";
import { Hour } from "@/lib/types";
import { dateToHour } from "@/lib/utils/time";
import { Booking } from "@prisma/client";
import { startOfDay, add, addDays, format } from "date-fns";

export function BookingTable({
  days,
  unavailableBookings: data,
  disabled,
  start,
  selectedSlots,
  onSlotClick,
  getPrice,
  isAvailable,
}: {
  days: number;
  unavailableBookings: Booking[];
  disabled: boolean;
  start: Date;
  selectedSlots: number[];
  onSlotClick: (hour: number) => void;
  getPrice: (hour: Hour) => number;
  isAvailable: (hour: Hour) => boolean;
}) {
  const end = startOfDay(add(start, { days })); // Exclusive
  const bookings = new Map(data.map((i) => [i.hour, i]));

  const datedDays = Array.from({ length: days }, (_, i) => addDays(start, i));

  const startHour = 9;
  const endHour = 23;

  const cellHeight = 2;

  const getHours = (day: Date) => {
    const start = dateToHour(startOfDay(day));
    return Array.from(
      { length: endHour - startHour },
      (_, i) => startHour + i,
    ).map((hour) => start + hour);
  };

  return (
    <Table>
      <TablePrefix>
        <TableTimeColumn
          cellHeight={cellHeight}
          startHour={startHour}
          endHour={endHour}
        />
      </TablePrefix>
      <TableContent>
        {datedDays.map((day, index) => (
          <TableContentColumn key={index} header={format(day, "dd")}>
            {getHours(day).map((hour) => {
              const price = getPrice(hour);
              const isUnavailable =
                !isAvailable(hour) || dateToHour(new Date()) >= hour;
              const slotKey = hour;
              const isSelected = selectedSlots.indexOf(slotKey) !== -1;

              return (
                <TableCell key={hour}>
                  <button
                    className={`box-border flex h-full w-full items-center justify-start px-2 ${isUnavailable ? "bg-base-300" : `cursor-pointer ${isSelected ? "bg-primary text-primary-content hover:bg-base-content" : "hover:bg-primary-content"}`}`}
                    onClick={(e) => {
                      e.preventDefault();
                      return (
                        !isUnavailable && !disabled && onSlotClick(slotKey)
                      );
                    }}
                  >
                    {price}
                  </button>
                </TableCell>
              );
            })}
          </TableContentColumn>
        ))}
      </TableContent>
    </Table>
  );
}

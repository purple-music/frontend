import PseudoLine from "@/components/atoms/PseudoLine/PseudoLine";
import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";

type PersonalBooking = {
  studio: StudioId;
  time: Date;
  people: number;
  status: "unpaid" | "paid" | "cancelled";
  cost: number;
};

interface PersonalBookingProps {
  booking: PersonalBooking;
}

const PersonalBooking = ({ booking }: PersonalBookingProps) => {
  return (
    <div className="w-full bg-surface-container-lowest h-10 items-center flex rounded-[16px]">
      <PseudoLine color="bg-brand-purple">
        <Typography variant="label">{booking.studio}</Typography>
      </PseudoLine>
    </div>
  );
};

interface PersonalBookingsProps {
  date: Date;
  bookings: PersonalBooking[];
}

const PersonalBookings = ({ date }: PersonalBookingsProps) => {
  return (
    <div className="w-full flex flex-col bg-surface-container-low rounded-[32px] p-4 gap-4">
      <div className="w-full justify-between flex">
        <Typography variant="title">{date.toDateString()}</Typography>
        <div>Time, People, Button</div>
      </div>

      <div className="w-full gap-4 flex flex-col">
        {["Orange", "Purple", "Blue"].map((name) => (
          <div
            key={name}
            className="w-full bg-surface-container-lowest h-10 items-center flex rounded-[16px]"
          >
            <Typography variant="label">{name}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBookings;

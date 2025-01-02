import StudiosHeader from "@/components/shared/StudiosHeader/StudiosHeader";
import { StudioId } from "@/lib/types";
import { getAllStudios } from "@/lib/utils/studios";

interface BookingStudioTimeSelectHeaderProps {
  day: Date;
  studios: StudioId[];
}

const BookingStudioTimeSelectHeader = ({
  day,
  studios,
}: BookingStudioTimeSelectHeaderProps) => {
  return (
    <div className="flex flex-row">
      <div className="w-12"></div>
      <div className="flex-1 flex flex-row justify-between rounded-t-[16px] overflow-clip">
        <StudiosHeader studios={getAllStudios()} studioNameSize="name" />
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectHeader;

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
      <div className="flex flex-1 flex-row justify-between overflow-clip rounded-t-[16px]">
        <StudiosHeader studios={getAllStudios()} studioNameSize="name" />
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectHeader;

import StudiosHeader from "@/components/shared/StudiosHeader/StudiosHeader";

interface BookingStudioTimeSelectHeaderProps {
  day: Date;
  studios: string[];
}

const BookingStudioTimeSelectHeader = ({
  day,
  studios,
}: BookingStudioTimeSelectHeaderProps) => {
  console.log("HEADER", studios);
  return (
    <div className="flex flex-row">
      <div className="w-12"></div>
      <div className="flex flex-1 flex-row justify-between overflow-clip rounded-t-[16px]">
        <StudiosHeader studios={studios} studioNameSize="name" />
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectHeader;

import Button from "@/components/atoms/Button/Button";
import VerticalTimeline from "@/components/atoms/VerticalTimeline/VerticalTimeline";
import { StudioId } from "@/lib/types";
import { getAllStudios } from "@/lib/utils/studios";

import {
  SelectedTimeSlot,
  StudioTimeSlotInfo,
} from "./BookingStudioTimeSelect";

interface BookingStudioTimeSelectBodyStudioProps {
  studio: StudioId;
  day: Date;
  timeSlots: Map<StudioId, StudioTimeSlotInfo>;
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingStudioTimeSelectBodyStudio = ({
  studio,
  day,
  timeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectBodyStudioProps) => {
  return (
    <div className="flex flex-col flex-1 p-2 w-32 bg-surface-container-lowest">
      <Button label={"2000р"} variant="outlined" />
    </div>
  );
};

interface BookingStudioTimeSelectBodyProps {
  day: Date;
  timeSlots: Map<StudioId, StudioTimeSlotInfo>;
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingStudioTimeSelectBody = ({
  day,
  timeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectBodyProps) => {
  const openHour = 9;
  const closeHour = 21;

  return (
    <div className="flex flex-row h-full overflow-y-scroll">
      <div className="flex-shrink-0 h-full">
        <VerticalTimeline
          startHour={openHour}
          endHour={closeHour}
          cellHeight="calc(3rem + 1rem)"
        />
      </div>
      <div className="flex flex-row rounded-br-[16px] divide-x divide-outline-variant flex-grow">
        {getAllStudios().map((studio) => (
          <BookingStudioTimeSelectBodyStudio
            key={studio}
            studio={studio}
            day={day}
            timeSlots={timeSlots}
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectBody;

import {
  TimelineWrapper,
  TimetableContent,
} from "@/components/organisms/Timetable/TimetableContent";

interface TimetableProps {}

const Timetable = () => {
  return (
    <div>
      <TimetableContent
        bookings={[]}
        days={30}
        studios={["blue", "orange", "purple"]}
      />
    </div>
  );
};

export default Timetable;

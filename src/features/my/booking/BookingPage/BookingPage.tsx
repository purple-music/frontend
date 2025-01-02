import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import BookingCalendar from "@/features/my/booking/BookingCalendar/BookingCalendar";

interface BookingPageProps {}

const BookingPage = ({}: BookingPageProps) => {
  return (
    <>
      <ButtonGroup
        buttons={[
          { label: "Home", value: "home" },
          { label: "Library", value: "library" },
        ]}
      />
      <BookingCalendar />
    </>
  );
};

export default BookingPage;

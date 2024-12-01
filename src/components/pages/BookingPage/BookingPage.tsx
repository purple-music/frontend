import ButtonGroup from "@/components/atoms/ButtonGroup/ButtonGroup";
import BookingCalendar from "@/components/molecules/BookingCalendar/BookingCalendar";

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

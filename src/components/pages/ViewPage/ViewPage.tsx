import ButtonGroup from "@/components/atoms/ButtonGroup/ButtonGroup";
import PersonalBookings from "@/components/organisms/PersonalBookings/PersonalBookings";
import Timetable from "@/components/organisms/Timetable/Timetable";
import MyTemplate from "@/components/templates/MyTemplate/MyTemplate";

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
  return (
    <MyTemplate>
      <ButtonGroup
        buttons={[
          { label: "Home", value: "home" },
          { label: "Library", value: "library" },
        ]}
      />
      <Timetable></Timetable>
      <PersonalBookings date={new Date()} bookings={[]} />
    </MyTemplate>
  );
};

export default DashboardPage;


import ButtonGroup from "@/components/atoms/ButtonGroup/ButtonGroup";
import Timetable from "@/components/organisms/Timetable/Timetable";
import MyTemplate from "@/components/templates/MyTemplate/MyTemplate";

interface ViewPageProps {}

const ViewPage = ({}: ViewPageProps) => {
  return (
    <>
      <ButtonGroup
        buttons={[
          { label: "Home", value: "home" },
          { label: "Library", value: "library" },
        ]}
      />
      <Timetable
        startDate={new Date("2023-01-01")}
        endDate={new Date("2023-01-08")}
        timezone="en-US"
        studios={["blue", "orange", "purple"]}
      ></Timetable>
    </>
  );
};

export default ViewPage;

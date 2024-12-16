import { addDays } from "date-fns";
import React, { useState } from "react";

import ButtonGroup from "@/components/atoms/ButtonGroup/ButtonGroup";
import MultiSelectButtonGroup from "@/components/atoms/MultiSelectButtonGroup/MultiSelectButtonGroup";
import Timetable from "@/components/organisms/Timetable/Timetable";
import MyTemplate from "@/components/templates/MyTemplate/MyTemplate";
import { StudioId } from "@/lib/types";

interface ViewPageProps {}

type ButtonGroupButtons<T> = { label: string; value: T }[];

const ViewPage = ({}: ViewPageProps) => {
  const [selectedStudios, setSelectedStudios] = useState<StudioId[]>([
    "blue",
    "orange",
    "purple",
  ]);
  const [days, setDays] = useState<number>(7);

  const today = new Date();
  const studioButtons: ButtonGroupButtons<StudioId> = [
    { label: "Purple", value: "purple" },
    { label: "Orange", value: "orange" },
    { label: "Blue", value: "blue" },
  ];
  const dateRangeButtons: ButtonGroupButtons<number> = [
    { label: "day", value: 1 },
    { label: "3 days", value: 3 },
    { label: "week", value: 7 },
    { label: "month", value: 30 },
  ];

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <MultiSelectButtonGroup
          buttons={studioButtons}
          onClick={(values) => setSelectedStudios(values as StudioId[])}
        />
        <ButtonGroup
          buttons={dateRangeButtons}
          onClick={(value) => setDays(value)}
        />
      </div>
      <Timetable
        startDate={today}
        endDate={addDays(today, days)}
        timezone="en-US"
        studios={selectedStudios}
      ></Timetable>
    </>
  );
};

export default ViewPage;

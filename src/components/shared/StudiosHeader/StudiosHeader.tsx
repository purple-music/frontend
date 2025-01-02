import { StudioId } from "@/lib/types";
import {
  StudioNameSize,
  getSoftStudioColor,
  getStudioName,
} from "@/lib/utils/studios";

export const StudiosHeader = ({
  studios,
  studioNameSize = "name",
}: {
  studios: StudioId[];
  studioNameSize?: StudioNameSize;
}) => (
  <div className={`flex flex-row flex-1 justify-between h-8`}>
    {studios.map((studio) => (
      <div
        key={studio}
        className={`flex-1 ${getSoftStudioColor(studio)} flex items-center justify-center`}
      >
        {getStudioName(studio, studioNameSize)}
      </div>
    ))}
  </div>
);

export default StudiosHeader;

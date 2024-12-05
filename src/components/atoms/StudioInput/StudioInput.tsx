import Image from "next/image";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

import Card, { CardBody, CardTitle } from "@/components/atoms/Card/Card";
import CardRadioInput from "@/components/atoms/CardRadioInput/CardRadioInput";
import Surface from "@/components/atoms/Surface/Surface";
import { StudioId } from "@/lib/types";
import { getAllStudios, getStudioLabel } from "@/lib/utils/studios";

const StudioInput = () => {
  const allStudios = getAllStudios();
  return (
    <CardRadioInput
      options={allStudios}
      name="studio"
      value={"blue"}
      onChange={function (value: StudioId): void {
        throw new Error("Function not implemented.");
      }}
    >
      {(studio: StudioId, isChecked: boolean) => {
        return (
          <Card>
            <Image
              src={`/studios/${studio}.png`}
              alt={"Purple"}
              width={256}
              height={128}
              className="h-32 w-64 object-cover"
            />

            <CardBody>
              <div className="flex flex-row gap-4 justify-start items-start">
                {/* Checkmark */}
                <div className="flex items-center justify-center mt-2">
                  {isChecked ? (
                    <FaCircleCheck />
                  ) : (
                    <FaCircleXmark className="text-on-surface-variant" />
                  )}
                </div>
                <div className="flex flex-col">
                  <CardTitle>{getStudioLabel(studio)}</CardTitle>
                  <ul>
                    <li>- Звукозапись</li>
                    <li>- Микрофон</li>
                    <li>- Квадратура: 300 м2</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        );
      }}
    </CardRadioInput>
  );
};

export default StudioInput;

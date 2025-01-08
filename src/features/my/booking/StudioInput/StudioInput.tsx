import Image from "next/image";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

import Card, { CardBody, CardTitle } from "@/components/layout/Card/Card";
import Surface from "@/components/layout/Surface/Surface";
import CardRadioInput from "@/components/ui/CardRadioInput/CardRadioInput";
import { StudioId } from "@/lib/types";
import { getAllStudios, getStudioLabel } from "@/lib/utils/studios";

export interface StudioInputProps {
  onChange: (value: StudioId) => void;
  value: StudioId;
}

const StudioInput = ({ onChange, value }: StudioInputProps) => {
  const allStudios = getAllStudios();
  return (
    <CardRadioInput
      options={allStudios}
      name="studio"
      value={value}
      onChange={onChange}
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
              <div className="flex flex-row items-start justify-start gap-4">
                {/* Checkmark */}
                <div className="mt-2 flex items-center justify-center">
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

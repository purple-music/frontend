import CardRadioInput from "@/components/atoms/CardRadioInput/CardRadioInput";
import Surface from "@/components/atoms/Surface/Surface";
import Typography from "@/components/atoms/Typography/Typography";

export interface PeopleInputProps {
  onChange: (value: number) => void;
  value: number;
}

const PeopleInput = ({ onChange, value }: PeopleInputProps) => {
  const people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <CardRadioInput
      options={people}
      name="people"
      value={value}
      onChange={onChange}
    >
      {(people: number, isChecked: boolean) => {
        return (
          <Surface
            className={`justify-center items-center !w-12 !h-12 ${isChecked ? "!bg-secondary-container !text-on-secondary-container" : ""}`}
          >
            {/* Square with number on it */}
            <Typography variant="body">{people}</Typography>
          </Surface>
        );
      }}
    </CardRadioInput>
  );
};

export default PeopleInput;

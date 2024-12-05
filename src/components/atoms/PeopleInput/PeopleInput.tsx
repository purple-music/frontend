import CardRadioInput from "@/components/atoms/CardRadioInput/CardRadioInput";
import Surface from "@/components/atoms/Surface/Surface";
import Typography from "@/components/atoms/Typography/Typography";

const PeopleInput = () => {
  const people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <CardRadioInput
      options={people}
      name="people"
      value={4}
      onChange={function (value: number): void {
        throw new Error("Function not implemented.");
      }}
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

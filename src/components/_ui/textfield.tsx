import { Props } from "@/models/Props";

interface TextfieldProps extends Props {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Textfield(props: TextfieldProps) {
  return (
    <div className="w-[30rem] bg-tile h-[4.25rem] mb-md px-sm pt-xs rounded-br-lg">
      <input
        type="text"
        name={props.name}
        required={props.required || false}
        value={props.value}
        onChange={props.onChange}
        className="bg-transparent w-full border-b h-[2rem]"
      />
      <label htmlFor={props.name} className="text-xs ml-xs">{props.label}</label>
    </div>
  );
}

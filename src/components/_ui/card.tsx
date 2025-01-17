import { Props } from "@/models/Props";

interface CardProps extends Props {
  title: string;
}

export default function Card(props: CardProps) {
  return (
    <div className={`flex flex-col rounded-br-xl overflow-hidden ${props.className}`}>
      <div className="bg-primary text-onPrimary p-sm">
        <h2>{props.title}</h2>
      </div>
      <div className="grow bg-tile p-sm">{props.children}</div>
    </div>
  );
}

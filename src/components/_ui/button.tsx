import { convertClassesToString } from "../_helpers/classes";
import { Props } from "@/models/Props";
import { ButtonSizes } from "./_enums/Buttons";
import { PlattformColors } from "./_enums/PlattformColors";

interface CardProps extends Props {
  color?: PlattformColors.PRIMARY | PlattformColors.SECONDARY;
  size?: ButtonSizes;
  type?: "button" | "submit" | "reset";
}

export default function Button(props: CardProps) {
  const buttonSizes = {
    [ButtonSizes.SMALL]: "py-xxs px-sm text-xs rounded-br-md",
    [ButtonSizes.DEFAULT]: "py-xs px-md rounded-br-lg",
    [ButtonSizes.LARGE]: "py-sm px-lg text-xl rounded-br-2xl",
  };
  const buttonColors = {
    [PlattformColors.PRIMARY]:
      "bg-primary text-onPrimary hover:bg-primaryHover hover:text-onPrimaryHover",
    [PlattformColors.SECONDARY]:
      "bg-secondary text-onSecondary hover:bg-secondaryHover hover:text-onSecondaryHover",
  };
  const classes = [
    props.color
      ? buttonColors[props.color]
      : buttonColors[PlattformColors.PRIMARY],
    props.size ? buttonSizes[props.size] : buttonSizes[ButtonSizes.DEFAULT],
    props.type || "button",
    props.className,
    "transition-colors",
  ];
  return (
    <button className={convertClassesToString(classes)}>
      {props.children}
    </button>
  );
}

import { convertClassesToString } from "../_helpers/classes";
import { Props } from "@/models/Props";
import { ButtonColors, ButtonSizes } from "./_enums/Buttons";

interface CardProps extends Props {
  color?: ButtonColors;
  size?: ButtonSizes;
}

export default function Button(props: CardProps) {
  const buttonSizes = {
    [ButtonSizes.SMALL]: "py-xxs px-sm text-xs rounded-br-md",
    [ButtonSizes.DEFAULT]: "py-xs px-md rounded-br-lg",
    [ButtonSizes.LARGE]: "py-sm px-lg text-xl rounded-br-2xl",
  };
  const buttonColors = {
    [ButtonColors.PRIMARY]: "bg-primary text-onPrimary hover:bg-primaryHover hover:text-onPrimaryHover",
    [ButtonColors.SECONDARY]: "bg-secondary text-onSecondary hover:bg-secondaryHover hover:text-onSecondaryHover",
  };
  const classes = [
    props.color
      ? buttonColors[props.color]
      : buttonColors[ButtonColors.PRIMARY],
    props.size ? buttonSizes[props.size] : buttonSizes[ButtonSizes.DEFAULT],
    props.className,
    "transition-colors",
  ];
  return (
    <button className={convertClassesToString(classes)}>
      {props.children}
    </button>
  );
}

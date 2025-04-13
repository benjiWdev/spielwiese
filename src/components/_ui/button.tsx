import { convertClassesToString } from '../_helpers/classes'
import { Props } from '@/models/Props'
import { ButtonSizes } from './_enums/Buttons'
import { PlattformColors } from './_enums/PlattformColors'

interface CardProps extends Props {
  color?: PlattformColors.PRIMARY | PlattformColors.SECONDARY
  size?: ButtonSizes
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export default function Button({
  color = PlattformColors.PRIMARY,
  size = ButtonSizes.DEFAULT,
  type = 'button',
  onClick,
  className,
  children,
}: CardProps) {
  const buttonSizes = {
    [ButtonSizes.SMALL]: 'h-[24px] py-xxs px-sm text-xs rounded-br-md',
    [ButtonSizes.DEFAULT]: 'h-[40px] py-xs px-md rounded-br-lg',
    [ButtonSizes.LARGE]: 'h-[52px] py-sm px-lg text-xl rounded-br-2xl',
  }
  const buttonColors = {
    [PlattformColors.PRIMARY]: 'bg-primary text-onPrimary hover:bg-primaryHover hover:text-onPrimaryHover',
    [PlattformColors.SECONDARY]: 'bg-secondary text-onSecondary hover:bg-secondaryHover hover:text-onSecondaryHover',
  }
  const classes = [buttonColors[color], buttonSizes[size], className, 'transition-colors']
  return (
    <button type={type} className={convertClassesToString(classes)} onClick={onClick}>
      {children}
    </button>
  )
}

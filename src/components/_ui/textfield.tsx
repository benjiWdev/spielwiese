import { Props } from '@/models/Props'
import { convertClassesToString } from '../_helpers/classes'

interface TextfieldProps extends Props {
  label: string
  name: string
  required?: boolean
  type?: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Textfield(props: TextfieldProps) {
  const classes = ['w-[30rem] bg-tile h-[4.25rem] px-sm pt-xs rounded-br-lg', props.className]
  return (
    <div className={convertClassesToString(classes)}>
      <input
        type={props.name || 'text'}
        name={props.name}
        required={props.required || false}
        value={props.value}
        onChange={props.onChange}
        className="bg-transparent w-full border-b h-[2rem]"
      />
      <label htmlFor={props.name} className="text-xs ml-xs">
        {props.label}
      </label>
    </div>
  )
}

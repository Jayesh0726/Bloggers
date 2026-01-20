import React, { useId } from 'react'
import { Select as ShadcnSelect, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import { Label } from './ui/label'

const Select = React.forwardRef(function Select({
  label,
  options,
  className,
  value,
  onChange,
  ...props
}, ref) {
  const id = useId()
  
  return (
    <div className='w-full space-y-2'>
      {label && <Label htmlFor={id}>{label}</Label>}
      <ShadcnSelect value={value} onValueChange={onChange} {...props}>
        <SelectTrigger id={id} className={className} ref={ref}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  )
})




export default Select;
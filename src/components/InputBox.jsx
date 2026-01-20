import React, { useId } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'

const InputBox = React.forwardRef(function InputBox({
    label,
    error,
    className = "",
    type = "text",
    ...props
}, ref) {
    const id = useId();
    
    return (
        <div className='w-full space-y-2'>
            {label && (
                <Label htmlFor={id}>
                    {label}
                </Label>
            )}
            <Input
                type={type}
                ref={ref}
                id={id}
                className={className}
                aria-invalid={!!error}
                {...props}
            />
            {error && (
                <p className='text-sm text-destructive'>{error}</p>
            )}
        </div>
    )
})

export default InputBox
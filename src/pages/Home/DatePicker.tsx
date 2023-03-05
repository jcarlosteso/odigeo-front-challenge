import React, { useEffect, useState } from 'react'
import { isoDate } from '../../utils';

export interface DatePickerProps {
  name: string;
  className: string;
  value?: Date;
  onChange?: (dateString: string) => void;
}

const DatePicker = (props: DatePickerProps) => {
  const { className, name, onChange, value } = props
  const [ date, setDate ] = useState("")

  useEffect(() => {
    setDate(value ? isoDate(value) : "")
  }, [value])
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!onChange) return
    const { value } = e.target as HTMLInputElement

    onChange(isoDate(new Date(value)))
  }

  return (
    <input
      type="date"
      name={name}
      className={className}
      value={date}
      onChange={handleChange}
    />
  )
}

export default DatePicker
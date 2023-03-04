import React from 'react'

export interface DatePickerProps {
  name: string;
  className: string;
  value: Date | null;
  onChange?: (dateString: string) => void;
}

const isoDate = (d: Date): string => d.toISOString().split("T")[0]

const TODAY = isoDate(new Date())

const DatePicker = (props: DatePickerProps) => {
  const { className, name, onChange, value } = props

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!onChange) return
    const { value } = e.target

    onChange(isoDate(new Date(value)))
  }

  return (
    <input
      type="date"
      name={name}
      className={className}
      min={TODAY}
      value={value || TODAY}
      onChange={handleChange}
    />
  )
}

export default DatePicker
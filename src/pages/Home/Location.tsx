import React from 'react'
import { LocationData } from '../../api/locations';
import { FilterValues } from "./Filters";

export interface LocationProps {
  className?: string;
  locations?: LocationData[];
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (change: Partial<FilterValues>) => void 
}

const Location = (props: LocationProps) => {
  const { className, name, placeholder, value, onChange } = props

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (!onChange) return
    const { name, value } = e.target

    onChange({
      [name as keyof FilterValues]: value
    })
  }

  return (
    <>
      <input
        className={className}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  )
}

export default Location
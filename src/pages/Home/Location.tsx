import React, { useEffect, useState } from 'react'
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

interface SelectListProps {
  values: LocationData[]
}

const SelectList = (props: SelectListProps) => {
  const { values } = props

  return (
    <div>
      <select size={4} style={{ zIndex: 1000 }}>
        { values.map(({name}) => <option value={name}>{name}</option>) }
      </select>
    </div>
  )
}

const Location = (props: LocationProps) => {
  const { className, locations, name, placeholder, value, onChange } = props
  const [ suggested, suggest ] = useState<LocationData[] | null>(null)

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement
    const term = value as string

    if (term.length > 2) {
      const selection = locations?.filter(({ name }) => (
        name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      ))

      suggest(selection || [])
    }
    
    if (!onChange) return
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
      {
        (suggested !== null)
          ? <SelectList values={suggested} />
          : null
      }
    </>
  )
}

export default Location
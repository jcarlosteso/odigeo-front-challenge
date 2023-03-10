import styles from './styles.module.css'
import React, { useEffect, useRef, useState } from 'react'
import { LocationData } from '../../api/locations';
import { FilterValues } from "./Filters";
import { normalizeStr } from '../../utils';

export interface LocationProps {
  className?: string;
  locations?: LocationData[];
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (change: Partial<FilterValues>) => void
}

interface SelectListProps {
  values: LocationData[];
  linkedInput: React.Ref<HTMLInputElement>;
  onSelect: (value: string) => void;
  onCancel: () => void;
}

const SelectList = React.forwardRef((props: SelectListProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
  const { linkedInput, values, onCancel, onSelect } = props

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key, target } = e
    const select: HTMLSelectElement = target as HTMLSelectElement

    if (key === 'Escape') {
      onCancel()
    } else if (key === 'ArrowUp' && (select.selectedIndex === 0)) {
      linkedInput?.current?.focus()
    } else if (key === 'Enter' && (select.selectedIndex !== -1)) {
      onSelect(select.value)
    }
  }

  return (
    <select
      ref={ref}
      className={styles.locations}
      size={4}
      onClick={e => onSelect((e.target as HTMLOptionElement).value)}
      onFocus={e => e.target.selectedIndex = 0}
      onBlur={onCancel}
      onKeyDown={handleKeyDown}
      autoFocus
    >
      {values.map(({ name }, index) => <option key={`option_${index}`} value={name}>{name}</option>)}
    </select>
  )
})

const Location = (props: LocationProps) => {
  const { className, locations, name, placeholder, value, onChange } = props
  const [suggested, suggest] = useState<LocationData[] | null>(null)
  const [ visibleSuggestions, viewSuggestions ] = useState(false)

  const textRef = useRef<HTMLInputElement>(null)
  const selectorRef = useRef<HTMLSelectElement>(null)

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.target as HTMLInputElement
    const term = value as string

    const matching = (term.length < 3)
      ? null
      : (locations || []).filter(({ name }) => normalizeStr(name).includes(normalizeStr(term)))

    suggest(matching)
    viewSuggestions(true)
    onChange({ [name as keyof FilterValues]: value })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && !visibleSuggestions) viewSuggestions(true) 

    if ((suggested && suggested.length > 0) && e.key === 'ArrowDown' && selectorRef.current) {
      selectorRef.current.focus()
    }
  }

  const handleSelect = (value: string) => {
    if (textRef.current) {
      textRef.current.value = value
      onChange({ [name as keyof FilterValues]: value })
      viewSuggestions(false)
    }
  }

  const handleCancel = () => {
    viewSuggestions(false)
    if (textRef?.current) textRef.current.focus()
  }

  return (
    <span className={styles.wrapper}>
      <input
        ref={textRef}
        className={className}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {
        (visibleSuggestions && suggested && suggested.length > 0)
          ? <SelectList ref={selectorRef} linkedInput={textRef} values={suggested} onSelect={handleSelect} onCancel={handleCancel} />
          : null
      }
    </span>
  )
}

export default Location
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import Location from './Location'
import DatePicker from './DatePicker'
import { getAllLocations, LocationData } from '../../api/locations';

export interface FilterValues {
  origin?: string;
  destination?: string;
  departure?: Date;
}

interface FiltersProps {
  values: FilterValues;
  onChange?: (change: Partial<FilterValues>) => void;
}

const Filters = (props: FiltersProps) => {
  const { values, onChange } = props
  const [ locations, setLocations ] = useState<LocationData[]>([])
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const loader = async () => {
      setLoading(true)
      setLocations(await getAllLocations())
      setLoading(false)
    }
    
    loader()
  }, [])

  const handleDateChange = (dateString: string) => {
    if (!onChange) return

    onChange({ departure: new Date(dateString) })
  }

  return (
    <>
      <Location
        className={`${styles.field} ${styles.location}`}
        name="origin"
        placeholder="Where from?"
        locations={locations}
        value={values.origin}
        onChange={onChange}
      />
      <Location
        className={`${styles.field} ${styles.location}`}
        name="destination"
        placeholder="Where to?"
        onChange={onChange}
      />
      <DatePicker
        className={styles.field}
        name="departure"
        onChange={handleDateChange}
      />
    </>
  )
}

export default Filters
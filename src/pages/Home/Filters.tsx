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
      const list = await getAllLocations()
      setLocations(list.sort((l1, l2) => (l1.name.toLocaleLowerCase()).localeCompare(l2.name.toLocaleLowerCase())))
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
        locations={locations}
        placeholder="Where from?"
        value={values.origin}
        onChange={onChange}
      />
      <Location
        className={`${styles.field} ${styles.location}`}
        name="destination"
        locations={locations}
        placeholder="Where to?"
        value={values.destination}
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
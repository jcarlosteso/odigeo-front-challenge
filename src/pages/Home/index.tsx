import styles from './styles.module.css'
import { useMemo, useState } from 'react'
import Filters, { FilterValues } from './Filters'
import { isoDate } from '../../utils'
import { Link } from 'react-router-dom'

const Home = () => {
  const [filters, setFilters] = useState<FilterValues>({})

  const handleChange = (change: Partial<FilterValues>) => {
    setFilters(current => (
      { ...current, ...change }
    ))
  }
  
  const searchParams = useMemo(() => {
    const params = ({ ...filters, ...(filters.departure ? { departure: isoDate(filters.departure) } : {})})
    return (`?${new URLSearchParams(params as Record<string, string>).toString()}`)
  }, [filters])

  return (
    <div className={styles.page}>
      <Filters values={filters} onChange={handleChange} />
      <Link className={styles.search} to={`/results${searchParams}`}>Search flights</Link>
    </div>
  )
}

export default Home
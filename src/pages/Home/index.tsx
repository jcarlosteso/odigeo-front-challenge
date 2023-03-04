import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import Filters, { FilterValues } from './Filters'

const Home = () => {
  const [filters, setFilters] = useState<FilterValues>({
    departure: new Date()
  })

  const handleChange = (change: Partial<FilterValues>) => {
    setFilters(current => (
      { ...current, ...change }
    ))
  }
  
  useEffect(() => console.log(filters), [filters])

  return (
    <div className={styles.page}>
      <Filters values={filters} onChange={handleChange} />
    </div>
  )
}

export default Home
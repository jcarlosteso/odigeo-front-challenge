import styles from './styles.module.css'
import { useQuery } from "../../hooks/useQuery"
import { useEffect, useMemo, useState } from 'react';
import { getItineraries, ItineraryData } from '../../api/itineraries';
import { FilterValues } from '../Home/Filters';
import { hhmm, isoDate } from '../../utils';
import TravelData from './TravelData';
import Itinerary, { ItineraryCardData } from './Itinerary';

const FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit'
})

const formatDate = (date: Date): string => FORMATTER.format(date)

const compareItineraries = (i1: ItineraryCardData, i2: ItineraryCardData): number => {
  const sign = Math.sign(i1.price - i2.price)

  if (sign !== 0) return sign
  return isoDate(i1.departure).localeCompare(isoDate(i2.departure))
}

const Itineraries = () => {
  const params = useQuery()
  const origin = params.get('origin')
  const destination = params.get('destination')
  const departureParam = params.get('departure')

  const departure = departureParam ? new Date(departureParam) : null

  const filters: FilterValues = {
    origin: origin ?? undefined,
    destination: destination ?? undefined,
    departure: departure ?? undefined
  }

  const [loading, setLoading] = useState(false)
  const [itineraries, setItineraries] = useState<ItineraryCardData[]>([])
  const [fastestIndex, setFastestIndex] = useState(-1)

  const tagger = useMemo(() => ({
    0: 'Cheapest',
    [fastestIndex]: 'Fastest'
  }), [fastestIndex])

  useEffect(() => {
    const loader = async () => {
      setLoading(true)
      const list = await getItineraries(filters)

      const cards = list.map((itinerary: ItineraryData): ItineraryCardData => {
        const { departure, arrival } = itinerary
        const { hours, minutes } = hhmm(departure, arrival)

        return (
          {
            ...itinerary,
            milliseconds: arrival.valueOf() - departure.valueOf(),
            duration: `${hours}h${minutes > 0 ? ` ${minutes}` : ''}'`
          }
        )
      })

      cards.sort(compareItineraries)

      const [_, index] = cards.reduce((current, { milliseconds }, index) => {
        if (milliseconds < current[0]) return [milliseconds, index]
        return current
      }, [Infinity, -1])

      setFastestIndex(index)
      setItineraries(cards)
    }

    loader()
  }, [])

  return (
    <div className={styles.page}>
      <TravelData
        origin={origin || 'All origins'}
        destination={destination || 'All destinations'}
        departure={departure ? formatDate(new Date(departure)) : 'All dates'}
      />
      <div className={styles.itineraries}>
        {
          itineraries.map((itinerary, index) => (
            <Itinerary
              key={`itinerary_${index}`}
              data={itinerary}
              tag={tagger[index]}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Itineraries
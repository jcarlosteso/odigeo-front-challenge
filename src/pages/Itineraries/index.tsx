import styles from './styles.module.css'
import { useQuery } from "../../hooks/useQuery"
import { useEffect, useMemo, useState } from 'react';
import { getItineraries, ItineraryData } from '../../api/itineraries';
import { FilterValues } from '../Home/Filters';
import { hhmm, isoDate, plusDays } from '../../utils';

interface TravelDataProps {
  origin: string;
  destination: string;
  departure: string;
}

const FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit'
})

const formatDate = (date: Date): string => FORMATTER.format(date)

const TravelData = (props: TravelDataProps) => {
  return (
    <div className={styles.travel}>
      <strong>{props.origin || 'Anywhere'}&nbsp;&ndash;&nbsp;{props.destination || 'Anywhere'}</strong>
      <p>{props.departure}</p>
    </div>
  )
}

const compareItineraries = (i1: ItineraryCardData, i2: ItineraryCardData): number => {
  const sign = Math.sign(i1.price - i2.price)

  if (sign !== 0) return sign
  return isoDate(i1.departure).localeCompare(isoDate(i2.departure))
}

interface ItineraryProps {
  data: ItineraryCardData;
  tag?: string;
}

interface CarrierProps {
  carrier: string;
}

const Carrier = (props: CarrierProps) => {
  const { carrier } = props

  return (
    <span className={styles.carrier}>
      <img src={`/images/carriers/${carrier.toLocaleLowerCase()}.png`} />{carrier}
    </span>
  )
}

interface TagProps {
  text: string
}

const Tag = (props: TagProps) => <span className={styles.tag}>{props.text}</span>

interface WaypointProps {
  city: string;
  moment: Date;
  plus?: number;
  align?: 'left' | 'right';
}

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit'})

const Waypoint = (props: WaypointProps) => {
  const { align, city, moment, plus } = props
  const time = timeFormatter.format(moment)

  return (
    <div className={styles.waypoint}>
      <span className={styles.time}>
        <h2 style={{ textAlign: align || 'left' }}>{time}</h2>
        {
          plus && (plus > 0) && <small className={styles.plus}>+{plus}</small>
        }
      </span>
      <p style={{ textAlign: align || 'left' }}>{city}</p>
    </div>
  )
}

const Plane = () => (
  <svg viewBox="0 0 28 28" className={styles.plane}>
    <g fill-rule="evenodd">
      <path d="M25.847 15.986a1.54 1.54 0 00-.47-1.124 1.54 1.54 0 00-1.124-.47h-6.012l-6.026-10.23h-2.169l2.439 10.23-5.813.028-2.304-2.786h-2.17l1.18 4.352-1.231 4.394h2.139l2.384-2.798 5.785-.027L9.83 27.84h2.156l6.226-10.286h6.043c.441 0 .818-.148 1.124-.455.31-.31.47-.686.47-1.114h-.002z">
      </path>
    </g>
  </svg>
)

interface TripProps {
  duration: string;
}

const Trip = (props: TripProps) => {
  const { duration } = props
  
  return (
    <div className={styles.trip}>
      <span className={styles.decoration}>
        <hr />
        <Plane />
        <hr />
      </span>
      <small className={duration}>
        {duration}
      </small>
    </div>
  )
}

const Itinerary = (props: ItineraryProps) => {
  const { arrival, carrier, departure, destination, duration, origin, price } = props.data
  const {  tag } = props

  return (
    <div className={styles.itinerary}>
      <div className={styles.heading}>
        <Carrier carrier={carrier} />
        {
          tag && <Tag text={tag} />
        }
      </div>
      <div className={styles.details}>
        <Waypoint city={origin} moment={departure} />
        <Trip duration={duration} />
        <Waypoint city={destination} moment={arrival} align='right' plus={plusDays(departure, arrival)}/>
      </div>
      <h1 className={styles.price}>
        €{price}
      </h1>
    </div>
  )
}

interface Duration {
  milliseconds: number;
  duration: string
}

type ItineraryCardData = ItineraryData & Duration

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

  const [ loading, setLoading ] = useState(false)
  const [ itineraries, setItineraries ] = useState<ItineraryCardData[]>([])
  const [ fastestIndex, setFastestIndex ] = useState(-1)

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
        console.log(current, [milliseconds, index])
        if (milliseconds < current[0]) return [milliseconds, index]
        return current
      }, [Infinity, -1])

      setFastestIndex(index)
      setItineraries(cards)
    }

    loader()
  }, [])

  return (
    <>
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
    </>
  )
}

export default Itineraries
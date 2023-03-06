import styles from '../styles.module.css'
import { ItineraryData } from "../../../api/itineraries";
import Carrier from "./Carrier";
import Waypoint from './Waypoint';
import Trip from './Trip';
import { plusDays } from '../../../utils';

export interface Duration {
  milliseconds: number;
  duration: string
}

export type ItineraryCardData = ItineraryData & Duration

export interface ItineraryProps {
  data: ItineraryCardData;
  tag?: string;
}

interface TagProps {
  text: string
}

const Tag = (props: TagProps) => <span className={styles.tag}>{props.text}</span>


const Itinerary = (props: ItineraryProps) => {
  const { arrival, carrier, departure, destination, duration, origin, price } = props.data
  const { tag } = props

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
        <Waypoint city={destination} moment={arrival} align='right' plus={plusDays(departure, arrival)} />
      </div>
      <h1 className={styles.price}>
        €{price}
      </h1>
    </div>
  )
}

export default Itinerary
import styles from './styles.module.css'

export interface TravelDataProps {
  origin: string;
  destination: string;
  departure: string;
}

const TravelData = (props: TravelDataProps) => (
  <div className={styles.travel}>
    <strong>{props.origin}&nbsp;&ndash;&nbsp;{props.destination}</strong>
    <p>{props.departure}</p>
  </div>
)

export default TravelData
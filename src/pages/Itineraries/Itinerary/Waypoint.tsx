import styles from '../styles.module.css'

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit'})

export interface WaypointProps {
  city: string;
  moment: Date;
  plus?: number;
  align?: 'left' | 'right';
}

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

export default Waypoint
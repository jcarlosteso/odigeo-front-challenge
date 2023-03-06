import styles from '../styles.module.css'

export interface TripProps {
  duration: string;
}

const Plane = () => (
  <svg viewBox="0 0 28 28" className={styles.plane}>
    <g fill-rule="evenodd">
      <path d="M25.847 15.986a1.54 1.54 0 00-.47-1.124 1.54 1.54 0 00-1.124-.47h-6.012l-6.026-10.23h-2.169l2.439 10.23-5.813.028-2.304-2.786h-2.17l1.18 4.352-1.231 4.394h2.139l2.384-2.798 5.785-.027L9.83 27.84h2.156l6.226-10.286h6.043c.441 0 .818-.148 1.124-.455.31-.31.47-.686.47-1.114h-.002z">
      </path>
    </g>
  </svg>
)

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

export default Trip
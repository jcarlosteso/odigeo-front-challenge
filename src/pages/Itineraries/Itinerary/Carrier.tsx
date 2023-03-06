import styles from '../styles.module.css'

export interface CarrierProps {
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

export default Carrier
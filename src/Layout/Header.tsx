import { Link } from "react-router-dom"
import styles from "./styles.module.css"

const Header = () => (
  <header className={styles.navBar}>
    <Link className={styles.link} to="/">
      <img className={styles.logo} src="images/logo.jpg" />
    </Link>
    <h2>ODIGEO Frontend challenge</h2>
  </header>
)

export default Header
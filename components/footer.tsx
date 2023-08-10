import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <strong>Next/React + TS + QL</strong>
        </li>
        <li className={styles.navItem}>
          8.2023
        </li>
      </ul>
    </footer>
  )
}

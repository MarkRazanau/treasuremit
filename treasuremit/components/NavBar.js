import React from "react";
import styles from "../src/styles/NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.name}>TreasureMIT</div>
      <div className={styles.itemContainer}>
        <div className={styles.items}>Map</div>
        <div className={styles.items}>Chest</div>
        <div className={styles.items}>Profile</div>
      </div>
    </nav>
  );
}

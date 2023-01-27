import React from "react";
import styles from "../src/styles/NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.name}>TreasureMIT</div>
      <div className={styles.itemContainer}>
        <Link href="/treasuremap" className={styles.items}>
          Map
        </Link>
        <Link href="/chest" className={styles.items}>
          Chest
        </Link>
        <Link href="/profile" className={styles.items}>
          Profile
        </Link>
      </div>
    </nav>
  );
}

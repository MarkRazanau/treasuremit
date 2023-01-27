import React from "react";
import styles from "../src/styles/NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.name}>TreasureMIT</div>
      <div className={styles.itemContainer}>
        <Link href="/" className={styles.items}>
          Login
        </Link>
      </div>
    </nav>
  );
}

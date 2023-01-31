import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../src/styles/NavBar.module.css";
import Link from "next/link";

export default function MainNavBar(props) {
  return (
    <nav className={styles.container}>
      <Link href="/treasuremap" className={styles.name}>
        TreasureMIT
      </Link>
      <div className={styles.itemContainer}>
        <Link href="/treasuremap" className={styles.items}>
          Map
        </Link>
        <Link href="/chest" className={styles.items}>
          Chest
        </Link>
        <Link href="/profile" className={styles.items}>
          {props.username}
        </Link>
        <Link href="/logout" className={styles.items}>
          Logout
        </Link>
      </div>
    </nav>
  );
}

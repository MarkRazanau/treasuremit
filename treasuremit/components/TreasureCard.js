import React from "react";
import styles from "../src/styles/TreasureCard.module.css";

export default function TreasureCard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <div>Treasure: {props.treasure_name}</div>
        </div>
        <div>Description: {props.description}</div>
        <div>Clue: {props.clue}</div>
        <div>Date Found: {props.date_found}</div>
      </div>
    </div>
  );
}

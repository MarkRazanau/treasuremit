import React from "react";
import styles from "../src/styles/TreasureCard.module.css";
import scroll from "../public/scroll.png";

export default function TreasureCard(props) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${scroll.src})`,
      }}
    >
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <div>Treasure: {props.treasure_name}</div>
        </div>
        <div className={styles.content}>
          <b>Description: </b>
          {props.description}
        </div>
        <div className={styles.content}>
          <b>Clue: </b>
          {props.clue}
        </div>
        <div className={styles.content}>
          <b>Date Found: </b>
          {props.date_found}
        </div>
      </div>
    </div>
  );
}

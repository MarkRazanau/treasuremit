import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../src/styles/Avatar.module.css";
import beaver from "../public/beaver_default.png";
import eyes_0 from "../public/eyes_0.png";
import eyes_1 from "../public/eyes_1.png";
import eyes_2 from "../public/eyes_2.png";
import eyes_3 from "../public/eyes_3.png";

export default function Avatar(props) {
  const eyeObj = {
    0: eyes_0,
    1: eyes_1,
    2: eyes_2,
    3: eyes_3,
  };

  // let eyeCostume = null;
  // let eyeCost = parseInt(userEyeCost.slice(0, 1));
  // if (eyeCost === 0) {
  //   eyeCostume = <div className={styles.container}></div>;
  // } else {
  //   eyeCostume = <Image className={styles.container} src={eyeObj[eyeCost]} />;
  // }

  return (
    <div>
      <Image className={styles.container} src={beaver} alt="Beaver Face" />
      <Image
        className={styles.container}
        src={eyeObj[parseInt(props.new_costume.slice(0, 1))]}
        alt="Beaver Eye Costume"
      />
      {/* <Image className={styles.container} src={eyeObj[]} /> */}
    </div>
  );
}

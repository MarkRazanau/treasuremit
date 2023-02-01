import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../src/styles/Avatar.module.css";
import beaver from "../public/beaver_default.png";
import eyes_1 from "../public/eyes_1.png";
import eyes_2 from "../public/eyes_2.png";
import eyes_3 from "../public/eyes_3.png";

export default function Avatar() {
  const [eyeCostume, setEyeCostume] = useState(3);

  const eyeObj = {
    1: eyes_1,
    2: eyes_2,
    3: eyes_3,
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Image className={styles.container} src={beaver} />
      <Image className={styles.container} src={eyeObj[3]} />
    </div>
  );
}

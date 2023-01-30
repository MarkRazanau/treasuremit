import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../src/styles/NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const [userinfo, setUserinfo] = useState(undefined);

  useEffect(() => {
    fetch("https://oidc.mit.edu/userinfo", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("access_token"),
        Accept: "application/json, text/plain, */*",
      },
    }).then((response) => {
      if (response.ok)
        response.json().then((data) => {
          setUserinfo(data);
        });
      else router.replace({ pathname: "/logout" });
    });
  }, []);

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
          {userinfo?.preferred_username}
        </Link>
        <Link href="/logout" className={styles.items}>
          Logout
        </Link>
      </div>
    </nav>
  );
}

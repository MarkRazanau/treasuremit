import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../src/styles/NavBar.module.css";
import Link from "next/link";

export default function MainNavBar(props) {
  // const MINUTE_MS = 60000;

  // const objectWithData = {
  //   grant_type: "refresh_token",
  //   refresh_token: localStorage.getItem("refresh_token"),
  //   client_id: "baa96962-f4a6-4451-9c04-1fcf05c46c12",
  //   client_secret:
  //     "M5w0HVzW7szOSXGl2mk7kOykzShEkK7kc8pXZZKTCihNoCqAbEXSTU4Do92ysi9X_7SJMgSvQQIk2vxKhcaCzw",
  // };
  // const obj = {
  //   access_token:
  //     "eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2NzUyMzE1MDYsImF1ZCI6WyJiYWE5Njk2Mi1mNGE2LTQ0NTEtOWMwNC0xZmNmMDVjNDZjMTIiXSwiaXNzIjoiaHR0cHM6XC9cL29pZGMubWl0LmVkdVwvIiwianRpIjoiZjA4NTBjNDItZGMwMC00MWIwLWFiMDMtNzRhZjY5YWNmNjJjIiwiaWF0IjoxNjc1MjI3OTA2fQ.lQaxjAQ7si0zBEWA5vGJRUIuMZYL8yzcXIS9AOSSC7l2LMtDcYdHN0QnbEr16jsh9oFm6tbIiOn5ZptqG0aifspMdCuIRX8HyAyGE-TMi2-6OitSiMvfHmXBCeTb51IwBBxpvjMhMHy0sot_Sir91cI2SRzygzQfEGuWa-7_bdvy4Yx2NpbCcy-qLijpDWJAZJ4mah9gRzYjp3wd7tx_RHAYWBebWZzZNc5UefwsL9IEk4S1fnZCRZljHYlwgMMMAsaHFh0WjG0yyd8iWeC2h-5fweeFLw0_OmqHmcHt9ySi3h909aHVUKDw_5LuyXqYSJDnkn_yyk5rANJYO5wzAQ",
  //   token_type: "Bearer",
  //   refresh_token:
  //     "eyJhbGciOiJub25lIn0.eyJqdGkiOiJmMmE1OTk5NC03ZjgyLTQ1ZWUtYjViZi03ZWEyZDM0ZjZhZGMifQ.",
  //   expires_in: 3599,
  //   scope: "phone offline_access email address openid profile",
  //   id_token:
  //     "eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE2NzUyMDUwOTEsImV4cCI6MTY3NTIyODUwNiwic3ViIjoiMTBiYjc4ZWM5N2EwOGRmYmE4NjViMWFlOTM2ZTk4ZjEiLCJhdWQiOlsiYmFhOTY5NjItZjRhNi00NDUxLTljMDQtMWZjZjA1YzQ2YzEyIl0sImlzcyI6Imh0dHBzOlwvXC9vaWRjLm1pdC5lZHVcLyIsImlhdCI6MTY3NTIyNzkwNiwia2lkIjoicnNhMSJ9.MnWSdynC3kkIxGyKLpqAoH8cSuYrNW5nZ6No0ONv-ZLh4PJCH5mTk8cl65Rii9owf7j0mfm61Pu0aNL7tCe6YixS4rrEUeCqPXhqQNKBMRkwjh2iYZze2naEEFcQ37h7331P93gyuXeJnmeXCwO5OLO5BgbqpoNdzv2chcdZGqfmCfIKAo_nWNj3i_ji0ntIsGuAomwHEUCuYW_uK3LH6w6lGe3q-Bj-W5dyDE-w24CY4Wscalse3-9eCcgrMGYITatdPpRFD9iVWTkmiUIBrfJH3PaxBO8DRqM1XjtTkKmFuGnUp4bdSNgZE2YqZRbHil5chNzPkSGNlDfX-6bPig",
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch("https://oidc.mit.edu/token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Accept: "application/json, text/plain, */*",
  //       },
  //       body: new URLSearchParams(objectWithData),
  //     }).then((response) => {
  //       const jsonResponse = response.json();
  //       localStorage.setItem("id_token", jsonResponse["id_token"]);
  //       localStorage.setItem("access_token", jsonResponse["access_token"]);
  //     });
  //   }, MINUTE_MS);
  //   return () => clearInterval(interval);
  // }, []);

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

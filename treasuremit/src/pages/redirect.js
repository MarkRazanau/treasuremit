import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Redirect() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) {
      return;
    }

    let objectWithData = {
      grant_type: "authorization_code",
      code: code,
      // redirect_uri: "http://localhost:3000/redirect",
      redirect_uri: "https://treasuremit.herokuapp.com/redirect",
      client_id: "baa96962-f4a6-4451-9c04-1fcf05c46c12",
      client_secret:
        "M5w0HVzW7szOSXGl2mk7kOykzShEkK7kc8pXZZKTCihNoCqAbEXSTU4Do92ysi9X_7SJMgSvQQIk2vxKhcaCzw",
    };

    const returnUserID = async () => {
      const response = await fetch("https://oidc.mit.edu/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json, text/plain, */*",
        },
        body: new URLSearchParams(objectWithData),
      });
      const jsonResponse = await response.json();
      localStorage.setItem("id_token", jsonResponse["id_token"]);
      localStorage.setItem("access_token", jsonResponse["access_token"]);
      localStorage.setItem("refresh_token", jsonResponse["refresh_token"]);
      localStorage.setItem("expires_in", jsonResponse["expires_in"]);
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + jsonResponse["access_token"]
      );

      const userObj = {};
      const userInfo = await fetch("https://oidc.mit.edu/userinfo", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((info) =>
          localStorage.setItem("username", info["preferred_username"])
        );
      await router.replace({ pathname: "/treasuremap" });
    };
    returnUserID();
  }, [code]);

  return (
    <div className="Redirect-text">
      <h1>Redirecting!</h1>
    </div>
  );
}

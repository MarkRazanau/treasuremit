import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Redirect() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) {
      console.log("ERROR");
      return;
    }

    let objectWithData = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://treasuremit.herokuapp.com/redirect",
      client_id: "32e4f86c-7f80-453f-ba09-2114b9296b16",
      client_secret:
        "bbR_dEVLyKM_CEr1ubKwHeNiO9FhwHgBWSY7cfiqZmc3SIy0YBmeBa_1EEezL6owmCo5h9naSkw9SGCMR1yRgw",
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
      console.log(await response.json());
      await router.replace("/treasuremap");
    };
    returnUserID();
  }, [code]);

  return (
    <div className="Redirect-text">
      <h1>Redirecting!</h1>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Redirect() {
  const router = useRouter();
  const { code } = router.query;
  console.log(process.env.PORT, "abc");

  useEffect(() => {
    if (!code) {
      console.log("ERROR");
      return;
    }

    let objectWithData = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://treasuremit.herokuapp.com/redirect",
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

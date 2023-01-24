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
      redirect_uri: "http://localhost:3000/redirect",
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
    };
    returnUserID();
  }, [code]);

  return (
    <div>
      <h1>Logged in!</h1>
    </div>
  );
}

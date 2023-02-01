import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("expires_in");
    router.replace({ pathname: "/" });
  }, []);

  return (
    <div className="Redirect-text">
      <h1>Logging Out!</h1>
    </div>
  );
}

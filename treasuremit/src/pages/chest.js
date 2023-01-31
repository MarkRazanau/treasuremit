import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainNavBar from "../../components/MainNavBar";
import TreasureCard from "../../components/TreasureCard.js";

export default function Chest({ users }) {
  const [userName, setUserName] = useState("Profile");
  const [treasuresFound, setTreasuresFound] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);
  useEffect(() => {
    fetch("https://waldobook.herokuapp.com/user/finds", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json, text/plain, */*",
      },
    }).then((response) => {
      if (response.ok)
        response.json().then((data) => {
          setTreasuresFound(data);
        });
      else router.replace({ pathname: "/logout" });
    });
  }, []);

  let treasuresList = null;
  const hasTreasures = treasuresFound.length !== 0;
  if (hasTreasures) {
    treasuresList = treasuresFound.map((treasureObj, idx) => (
      <TreasureCard
        key={idx}
        treasure_name={treasureObj.placement.treasure.name}
        clue={treasureObj.placement.clue}
        description={treasureObj.placement.treasure.name}
        date_found={treasureObj.found_at}
      />
    ));
  } else {
    treasuresList = <div>No Treasures Found Yet!</div>;
  }

  return (
    <div className="Chest-wrapper">
      <MainNavBar username={userName} />
      <div className="TreasureFound-container">{treasuresList}</div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import MainNavBar from "../../components/MainNavBar";
import TreasureCard from "../../components/TreasureCard.js";

export default function Chest({ users }) {
  const [treasuresFound, setTreasuresFound] = useState([]);
  const myTreasures = [
    {
      treasure_name: "waldo",
      clue: "it was here",
      description: "it was actuall here",
      date_found: "right now",
    },
    {
      treasure_name: "waldo",
      clue: "it was here",
      description: "it was actuall here",
      date_found: "right now",
    },
    {
      treasure_name: "waldo",
      clue: "it was here",
      description: "it was actuall here",
      date_found: "right now",
    },
    {
      treasure_name: "waldo",
      clue: "it was here",
      description: "it was actuall here",
      date_found: "right now",
    },
  ];

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    setTreasuresFound(myTreasures);
  }, []);

  let treasuresList = null;
  const hasTreasures = treasuresFound.length !== 0;
  if (hasTreasures) {
    treasuresList = treasuresFound.map((treasureObj) => (
      <TreasureCard
        treasure_name={treasureObj.treasure_name}
        clue={treasureObj.clue}
        description={treasureObj.description}
        date_found={treasureObj.date_found}
      />
    ));
  } else {
    treasuresList = <div>No Treasures Found Yet!</div>;
  }

  return (
    <div className="Chest-wrapper">
      <MainNavBar />
      <div className="TreasureFound-container">{treasuresList}</div>
    </div>
  );
}

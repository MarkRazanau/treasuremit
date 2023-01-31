import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import MainNavBar from "../../components/MainNavBar";
import Map from "../../components/Map";
import { useRouter } from "next/router";
import { userInfo } from "os";
import Treasure from "./api/models/Treasure";
import dbConnect from "../../serv/dbConnect";

export default function TreasureMap() {
  const [treasures, setTreasures] = useState([]);
  const [userName, setUserName] = useState("Profile");
  const router = useRouter();

  useEffect(() => {
    fetch("https://waldobook.herokuapp.com/treasures", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json, text/plain, */*",
      },
    }).then((response) => {
      if (response.ok)
        response.json().then((data) => {
          setTreasures(data);
        });
      else router.replace({ pathname: "/logout" });
    });
  }, []);

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return (
      <div>
        <MainNavBar username={userName} />
        <div>Looking for Treasure Map...</div>
      </div>
    );
  }
  return (
    <div className="map-wrapper">
      <MainNavBar username={userName} />
      <Map props={treasures} />
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Treasure.find({});
  const treasures = result.map((doc) => {
    const treasure = doc.toObject();
    treasure._id = treasure._id.toString();
    return treasure;
  });
  return { props: { treasures: treasures } };
}

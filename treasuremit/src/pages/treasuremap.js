import { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import MainNavBar from "../../components/MainNavBar";
import Map from "../../components/Map";
import { useRouter } from "next/router";
import { userInfo } from "os";
import Treasure from "./api/models/Treasure";
import dbConnect from "../../serv/dbConnect";

export default function TreasureMap({ treasures }) {
  console.log(treasures);
  const router = useRouter();

  useEffect(() => {
    let userInfo = router.query;
    router.replace("/treasuremap", undefined, { shallow: true });
    console.log("got it", userInfo);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return (
      <div>
        <MainNavBar props={userInfo} />
        <div>Looking for Treasure Map...</div>
      </div>
    );
  }
  return (
    <div className="map-wrapper">
      <MainNavBar props={userInfo} />
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

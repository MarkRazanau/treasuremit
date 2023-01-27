import { useMemo } from "react";
import { GoogleMap, useLoadScript, CircleF } from "@react-google-maps/api";
import MainNavBar from "../../components/MainNavBar";
import Map from "../../components/Map";

export default function TreasureMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return (
      <div>
        <MainNavBar />
        <div>Looking for Treasure Map...</div>
      </div>
    );
  }
  return (
    <div className="map-wrapper">
      <MainNavBar />
      <Map />
    </div>
  );
}

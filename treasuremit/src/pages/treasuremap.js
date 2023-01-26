import { useMemo } from "react";
import { GoogleMap, useLoadScript, CircleF } from "@react-google-maps/api";
import NavBar from "../../components/NavBar";
import Map from "../../components/Map";

export default function TreasureMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return (
      <div>
        <NavBar />
        <div>Looking for Treasure Map...</div>
      </div>
    );
  }
  return (
    <div className="map-wrapper">
      <NavBar />
      <Map />
    </div>
  );
}

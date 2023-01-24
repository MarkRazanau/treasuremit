import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import NavBar from "../../components/NavBar";

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
    <div>
      <NavBar />
      <Map />
    </div>
  );
}

function Map() {
  const center = useMemo(
    () => ({ lat: 42.36004341235203, lng: -71.0942029172697 }),
    []
  );

  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

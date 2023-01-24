import { useMemo } from "react";
import { GoogleMap, useLoadScript, CircleF } from "@react-google-maps/api";
import NavBar from "../../components/NavBar";


const fake_treasures = [
  {
    "clue": "newest clue",
    "long": -71.096775,
    "lat": 42.359767,
    "uuid": "db9500f1-9ba2-44f3-befe-6d5d89738789",
    "treasure": {
      "name": "hello",
      "description": "world",
      "uuid": "abc123",
      "is_active": true
    },
    "placed_by": {
      "sub": "3d80c013d0d0f2379622acf1f324c6fa",
      "is_active": true
    },
    "placed_at": "2023-01-24T19:03:07"
  },
  {
    "clue": "now its in a new place",
    "long": -71.091380,
    "lat": 42.359156,
    "uuid": "6f33f91b-7ce7-415e-ac37-db10e10e40b0",
    "treasure": {
      "name": "new treasure",
      "description": "its new",
      "uuid": "eefb0268-fbaf-4065-a16e-ec87444a1eab",
      "is_active": true
    },
    "placed_by": {
      "sub": "3d80c013d0d0f2379622acf1f324c6fa",
      "is_active": true
    },
    "placed_at": "2023-01-24T20:32:19"
  }
]

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
    >
        {fake_treasures.map((treasure, idx) => {
            return (
                <CircleF
                key={idx}
                center={{lat: treasure["lat"], lng: treasure["long"]}}
                radius={100}
                onLoad={() => console.log('Circle Load...')}
                options={{
                    fillColor: 'red',
                    strokeColor: 'red',
                    strokeOpacity: 0.8,
                }}
                />
            );
        })}
      </GoogleMap>
  );
}

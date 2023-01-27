import React, { useMemo, useRef, useCallback, useState } from "react";
import {
  GoogleMap,
  CircleF,
  Polygon,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyle from "../src/styles/Map.module.css";

const fake_treasures = [
  {
    clue: "newest clue",
    long: -71.096775,
    lat: 42.359767,
    uuid: "db9500f1-9ba2-44f3-befe-6d5d89738789",
    treasure: {
      name: "hello",
      description: "world",
      uuid: "abc123",
      is_active: true,
    },
    placed_by: {
      sub: "3d80c013d0d0f2379622acf1f324c6fa",
      is_active: true,
    },
    placed_at: "2023-01-24T19:03:07",
  },
  {
    clue: "now its in a new place",
    long: -71.09138,
    lat: 42.359156,
    uuid: "6f33f91b-7ce7-415e-ac37-db10e10e40b0",
    treasure: {
      name: "new treasure",
      description: "its new",
      uuid: "eefb0268-fbaf-4065-a16e-ec87444a1eab",
      is_active: true,
    },
    placed_by: {
      sub: "3d80c013d0d0f2379622acf1f324c6fa",
      is_active: true,
    },
    placed_at: "2023-01-24T20:32:19",
  },
];

export default function Map() {
  const mitCoords = [
    [-71.1050195, 42.3552809],
    [-71.1049399, 42.3554614],
    [-71.1048573, 42.3556488],
    [-71.1038089, 42.3561671],
    [-71.1037115, 42.3562152],
    [-71.1023418, 42.3568922],
    [-71.1013778, 42.3573687],
    [-71.1015461, 42.3575447],
    [-71.1015554, 42.3575549],
    [-71.1019653, 42.3580018],
    [-71.1020862, 42.3581138],
    [-71.1021006, 42.3581066],
    [-71.102331, 42.3579926],
    [-71.1024347, 42.357941],
    [-71.1026466, 42.3581695],
    [-71.1028991, 42.3583091],
    [-71.1026473, 42.3585476],
    [-71.1024784, 42.3586508],
    [-71.102066, 42.3588391],
    [-71.1021503, 42.3589463],
    [-71.1025866, 42.3592145],
    [-71.1025642, 42.359234],
    [-71.1032446, 42.3596365],
    [-71.1025171, 42.3602633],
    [-71.1009567, 42.3594114],
    [-71.0980964, 42.3606745],
    [-71.0972769, 42.3602051],
    [-71.0960705, 42.3607314],
    [-71.0957092, 42.3608875],
    [-71.0948736, 42.3612533],
    [-71.0942446, 42.3615325],
    [-71.0936316, 42.3618268],
    [-71.0937458, 42.3619562],
    [-71.0937397, 42.3619665],
    [-71.0936899, 42.3620603],
    [-71.0936597, 42.3621625],
    [-71.0936135, 42.3624025],
    [-71.0935419, 42.3628697],
    [-71.0898006, 42.3625969],
    [-71.088304, 42.3624794],
    [-71.0870358, 42.3623829],
    [-71.0852648, 42.3622414],
    [-71.0851142, 42.3622198],
    [-71.084681, 42.3621909],
    [-71.0843165, 42.3621572],
    [-71.0831695, 42.3619591],
    [-71.0821513, 42.3618819],
    [-71.0817414, 42.3611814],
    [-71.0859956, 42.3597475],
    [-71.0861117, 42.3597115],
    [-71.0861422, 42.3597012],
    [-71.0863088, 42.3596452],
    [-71.0866506, 42.3595301],
    [-71.0867663, 42.3594896],
    [-71.0879005, 42.3591089],
    [-71.0881132, 42.3590371],
    [-71.0884231, 42.3589324],
    [-71.088511, 42.3589027],
    [-71.0886152, 42.3588676],
    [-71.0893511, 42.358623],
    [-71.089479, 42.35858],
    [-71.0896294, 42.3585297],
    [-71.0896455, 42.3585195],
    [-71.0906281, 42.3581967],
    [-71.0925799, 42.3575419],
    [-71.0925871, 42.3575398],
    [-71.0929088, 42.3574445],
    [-71.0967109, 42.3561684],
    [-71.0970474, 42.3560552],
    [-71.0976514, 42.355858],
    [-71.0979062, 42.3557721],
    [-71.0982528, 42.3556604],
    [-71.0982852, 42.3556502],
    [-71.0987323, 42.355501],
    [-71.0987609, 42.3554901],
    [-71.0989387, 42.3554319],
    [-71.098926, 42.3554091],
    [-71.0989303, 42.3554077],
    [-71.0995286, 42.3552089],
    [-71.0995914, 42.3551881],
    [-71.0998044, 42.3551167],
    [-71.1000241, 42.3550431],
    [-71.1000434, 42.3550366],
    [-71.1002832, 42.3549562],
    [-71.1003045, 42.3549491],
    [-71.1006165, 42.3548445],
    [-71.1010269, 42.3547069],
    [-71.1021802, 42.3543204],
    [-71.1024204, 42.3542399],
    [-71.1024475, 42.3542308],
    [-71.1030128, 42.3540413],
    [-71.1035131, 42.353896],
    [-71.1035188, 42.3538945],
    [-71.1035469, 42.3538872],
    [-71.1035913, 42.3538757],
    [-71.103743, 42.3538363],
    [-71.103778, 42.3538264],
    [-71.1039699, 42.353788],
    [-71.1041561, 42.3537528],
    [-71.1043114, 42.3537235],
    [-71.104575, 42.3536815],
    [-71.1046507, 42.3540692],
    [-71.1046632, 42.3541443],
    [-71.1046953, 42.3542045],
    [-71.1047396, 42.3542858],
    [-71.1047657, 42.35434],
    [-71.1047998, 42.3544095],
    [-71.1048374, 42.3544994],
    [-71.1048776, 42.354579],
    [-71.1049196, 42.3546579],
    [-71.10498, 42.3547494],
    [-71.1050143, 42.3548024],
    [-71.1052895, 42.3550229],
    [-71.1049256, 42.3551745],
    [-71.1050195, 42.3552809],
  ];
  let mitPolyCoords = [];
  mitCoords.map((LatLong) =>
    mitPolyCoords.push({ lat: LatLong[1], lng: LatLong[0] })
  );

  let maxLatitude = (Math.atan(Math.sinh(Math.PI)) * 180) / Math.PI;

  const worldCoords = [
    [-maxLatitude, -180],
    [-maxLatitude, 180],
    [maxLatitude, 180],
    [maxLatitude, -180],
  ];

  let worldPolyCoords = [];
  worldCoords.map((LatLong) =>
    worldPolyCoords.push({ lat: LatLong[1], lng: LatLong[0] })
  );

  const mapRef = useRef();
  const mitCenter = useMemo(
    () => ({ lat: 42.35904341235203, lng: -71.0942029172697 }),
    []
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "f4a68acad93f264f",
    }),
    []
  );

  const restrictions = useMemo(
    () => ({
      latLngBounds: {
        north: 42.42,
        south: 42.24,
        west: -71.27,
        east: -70.85,
      },
      strictBounds: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const [selected, setSelected] = useState(null);

  return (
    <GoogleMap
      zoom={16}
      center={mitCenter}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onLoad}
      restriction={restrictions}
    >
      <Polygon
        paths={[worldPolyCoords, mitPolyCoords.reverse()]}
        options={{ fillOpacity: 0.3, fillColor: "#000000", strokeOpacity: 0 }}
      />

      {/* <Polygon
        paths={[mitPolyCoords]}
        options={{ fillOpacity: 0, fillColor: "#000000", strokeOpacity: 0 }}
      /> */}

      {fake_treasures.map((treasure, idx) => {
        return (
          <CircleF
            key={idx}
            center={{ lat: treasure["lat"], lng: treasure["long"] }}
            radius={60}
            options={{
              fillColor: "#9c1414",
              fillOpacity: 0.4,
              strokeColor: "#9c1414",
              strokeOpacity: 0.7,
            }}
            onClick={() => {
              setSelected(treasure);
            }}
          />
        );
      })}
      {selected && (
        <InfoWindow
          position={{ lat: selected["lat"] + 0.0007, lng: selected["long"] }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h2 className="infoTitle">Clue</h2>
            <p className="infoClue">{selected["clue"]}</p>
          </div>
        </InfoWindow>
      )}
      {/* {
        mapPath.map(())
      } */}
    </GoogleMap>
  );
}

import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  GoogleMap,
  CircleF,
  Polygon,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { checkIsManualRevalidate } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

export default function Map() {
  const router = useRouter();

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
  const [caches, setCaches] = useState([]);
  const [coords, setCoords] = useState(undefined);

  useEffect(() => {
    console.log(caches);
  }, [caches]);

  const [settingTreasure, setSettingTreasure] = useState(false);
  const [settingHeldTreasure, setSettingHeldTreasure] = useState(false);
  const [popupTreasure, setPopupTreasure] = useState(false);
  const [popupHeld, setPopupHeld] = useState(false);
  const [claimingTreasure, setClaimingTreasure] = useState(false);
  const [failedClaim, setFailedClaim] = useState(false);
  const [holdClaim, setHoldClaim] = useState(false);
  const [confirmClaim, setConfirmClaim] = useState(undefined);
  const [placeConfirmClaim, setPlaceConfirmClaim] = useState(undefined);
  const [successTreasure, setSuccessTreasure] = useState(false);
  const [treasures, setTreasures] = useState([]);

  useEffect(() => {
    updateTreasures();
  }, []);

  function updateTreasures() {
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
  }

  function settingNewTreasure() {
    setSettingTreasure(true);
  }

  function settingNewHeldTreasure() {
    setSettingHeldTreasure(true);
  }

  function cancelNewTreasure() {
    setSettingTreasure(false);
    setSettingHeldTreasure(false);
  }

  function getNewLocation(coord) {
    if (settingTreasure) {
      fetch("https://waldobook.herokuapp.com/treasure/qrgen", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("id_token"),
          Accept: "application/json, text/plain, */*",
        },
      })
        .then((res) => {
          return res.blob();
        })
        .then((data) => {
          var a = document.createElement("a");
          a.target = "_blank";
          a.href = window.URL.createObjectURL(data);
          a.downlaod = "FILENAME";
          a.click();
        });

      setCoords([coord.latLng.lat(), coord.latLng.lng()]);
      // console.log(coord.latLng.lat());
      // console.log(coord.latLng.lng());
      setPopupTreasure(true);
      setSettingTreasure(false);
    } else if (settingHeldTreasure) {
      setCoords([coord.latLng.lat(), coord.latLng.lng()]);
      setPopupHeld(true);
      setSettingHeldTreasure(false);
    }
  }
  function checkingClaim() {
    setClaimingTreasure(true);
  }

  function closeModal() {
    setPopupTreasure(false);
    setPopupHeld(false);
    setClaimingTreasure(false);
    setHoldClaim(false);
    setConfirmClaim(undefined);
    setSuccessTreasure(false);
    setPlaceConfirmClaim(undefined);
    setFailedClaim(false);
    setSelected(null);
    updateTreasures();
  }

  function submitTreasure() {
    const qr_secret = document.getElementById("secret").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const clue = document.getElementById("clue").value;
    fetch("https://waldobook.herokuapp.com/treasure/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qr_secret: qr_secret,
        name: name,
        description: description,
      }),
    }).then(() => {
      fetch("https://waldobook.herokuapp.com/treasure/place", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("id_token"),
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qr_secret: qr_secret,
          clue: clue,
          lat: coords[0],
          long: coords[1],
        }),
      }).then((response) => {
        if (response.ok) {
          setSuccessTreasure(true);
          setPopupTreasure(false);
        } else {
          setPopupTreasure(false);
        }
      });
    });
  }

  function claimTreasure() {
    const qr_secret = document.getElementById("claim_qr_secret").value;

    fetch("https://waldobook.herokuapp.com/treasure/find", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qr_secret: qr_secret,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setHoldClaim(true);
        } else {
          setFailedClaim(true);
        }
      })
      .then(setClaimingTreasure(false));
  }

  function holdTreasure() {
    const qr_secret = document.getElementById("hold_qr_secret").value;

    fetch("https://waldobook.herokuapp.com/treasure/hold", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qr_secret: qr_secret,
      }),
    }).then((response) => {
      if (response.ok) {
        setConfirmClaim(true);
        setHoldClaim(false);
      } else {
        setConfirmClaim(false);
      }
    });
  }

  function placeTreasure() {
    const qr_secret = document.getElementById("newhold_qr_secret").value;
    const clue = document.getElementById("heldClue").value;

    fetch("https://waldobook.herokuapp.com/treasure/place", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qr_secret: qr_secret,
        clue: clue,
        lat: coords[0],
        long: coords[1],
      }),
    }).then((response) => {
      if (response.ok) {
        setPlaceConfirmClaim(true);
        setHoldClaim(false);
      } else {
        setPlaceConfirmClaim(false);
      }
    });
  }

  return (
    <div>
      {(settingTreasure || settingHeldTreasure) && (
        <div className="TreasureMap-setInfo">
          Click On The Map to Place Your Treasure
        </div>
      )}
      {(settingTreasure || settingHeldTreasure) && (
        <div className="TreasureMap-button-cancel" onClick={cancelNewTreasure}>
          <div className="TreasureMap-cancel-text">
            <strong>Cancel</strong>
          </div>
        </div>
      )}
      {!settingTreasure && !settingHeldTreasure && (
        <div className="TreasureMap-button-new" onClick={settingNewTreasure}>
          <div className="TreasureMap-button-text">Create New Treasure</div>
        </div>
      )}

      {!settingHeldTreasure && !settingTreasure && (
        <div
          className="TreasureMap-button-held"
          onClick={settingNewHeldTreasure}
        >
          <div className="TreasureMap-button-text">Place Held Treasure</div>
        </div>
      )}

      <GoogleMap
        zoom={16}
        center={mitCenter}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
        restriction={restrictions}
        // onClick={(coord) => {
        //   setCaches([...caches, [coord.latLng.lat(), coord.latLng.lng()]]);
        // }}
        onClick={getNewLocation}
      >
        <Polygon
          paths={[mitPolyCoords.reverse(), worldPolyCoords]}
          options={{ fillOpacity: 0.3, fillColor: "#000000", strokeOpacity: 0 }}
        />

        {/* <Polygon
        paths={[mitPolyCoords]}
        options={{ fillOpacity: 0, fillColor: "#000000", strokeOpacity: 0 }}
      /> */}
        {treasures.map((treasure, idx) => {
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
              <button onClick={checkingClaim}>Claim Treasure!</button>
            </div>
          </InfoWindow>
        )}
        {/* {
        mapPath.map(())
      } */}
      </GoogleMap>

      {popupTreasure && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h1>Set Up Your Treasure!</h1>
            <p className="Modal-inputText">
              Scan Your QR Code and Place The Text Here:
            </p>
            <input type="text" className="Modal-inputName" id="secret"></input>
            <p className="Modal-inputText">Treasure Name:</p>
            <input type="text" className="Modal-inputName" id="name"></input>
            <p className="Modal-inputText">Treasure Clue:</p>
            <textarea className="Modal-inputs" id="clue"></textarea>
            <p className="Modal-inputText">Treasure Description:</p>
            <textarea className="Modal-inputs" id="description"></textarea>
            <div>
              <button
                className="TreasureMap-modal-close-btn"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="TreasureMap-modal-submit-btn"
                onClick={submitTreasure}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {popupHeld && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h2>Verify The Treasure ID Below</h2>
            <input
              type="text"
              className="Modal-claim"
              id="newhold_qr_secret"
              placeholder="Enter Treasure UID"
            ></input>
            <p className="Modal-inputText">New Treasure Clue:</p>
            <textarea className="Modal-inputs" id="heldClue"></textarea>
            <p
              style={{
                visibility: placeConfirmClaim === false ? "visible" : "hidden",
              }}
            >
              The Treasure ID is incorrect :(
            </p>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Leave
            </button>
            <button
              className="TreasureMap-modal-submit-btn"
              onClick={placeTreasure}
            >
              Place
            </button>
          </div>
        </div>
      )}
      {successTreasure && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h2 style={{ "text-align": "center", "margin-bottom": "30px" }}>
              You Successfully Created a New Treasure!
            </h2>
            <p style={{ "text-align": "center", "margin-bottom": "50px" }}>
              Try looking for other people&apos;s treasures, or even set up
              another treasure if you have more goodies to hide!
            </p>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {placeConfirmClaim && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h2 style={{ "text-align": "center", "margin-bottom": "30px" }}>
              You Successfully Re-Placed The Treasure!
            </h2>
            <p style={{ "text-align": "center", "margin-bottom": "50px" }}>
              Try looking for other people&apos;s treasures, or even set up
              another treasure if you have more goodies to hide!
            </p>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {claimingTreasure && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h1>Claim The Treasure!</h1>
            <input
              type="text"
              className="Modal-claim"
              id="claim_qr_secret"
              placeholder="Enter Treasure UID"
            ></input>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="TreasureMap-modal-submit-btn"
              onClick={claimTreasure}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {failedClaim && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h2 style={{ "text-align": "center", "margin-bottom": "30px" }}>
              The Treasure ID is Incorrect :(
            </h2>
            <p style={{ "text-align": "center", "margin-bottom": "50px" }}>
              If you did find the treasure, double-check that you are entering
              the Treasure ID correctly.
            </p>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {holdClaim && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h1>You Found The Treasure!!!</h1>
            <h3>
              You can now hold to leave the treasure where you found it for
              others to find or choose to hold onto it and place it in a new
              location using the same Treasure ID. If you choose to hold, enter
              the treasure ID below:
            </h3>
            <input
              type="text"
              className="Modal-claim"
              id="hold_qr_secret"
              placeholder="Enter Treasure UID"
            ></input>
            <p
              style={{
                visibility: confirmClaim === false ? "visible" : "hidden",
              }}
            >
              The Treasure ID is incorrect :(
            </p>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Leave
            </button>
            <button
              className="TreasureMap-modal-submit-btn"
              onClick={holdTreasure}
            >
              Hold
            </button>
          </div>
        </div>
      )}
      {confirmClaim && (
        <div className="TreasureMap-modal">
          <div className="TreasureMap-modal-overlay"></div>
          <div className="TreasureMap-modal-content">
            <h2 style={{ "text-align": "center", "margin-bottom": "30px" }}>
              You Successfully Held Onto The Treasure!
            </h2>
            <p style={{ "text-align": "center", "margin-bottom": "50px" }}>
              Make sure you place the treasure in a new location so that others
              can enjoy the experience of finding the same treasure :)
            </p>
            <button
              className="TreasureMap-modal-close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

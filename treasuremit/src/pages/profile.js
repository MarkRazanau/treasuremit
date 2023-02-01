import React, { useState, useEffect, componentDidMount } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import MainNavBar from "../../components/MainNavBar";
import dbConnect from "../../serv/dbConnect";
import User from "./api/models/User";
import Avatar from "../../components/Avatar";
import scroll from "../../public/profile_scroll.png";

export default function Profile() {
  const router = useRouter();
  const [userinfo, setUserinfo] = useState(undefined);
  const [userCost, setUserCost] = useState("000");
  const [userName, setUserName] = useState("Profile");
  const [treasuresFound, setTreasuresFound] = useState([]);
  const [editing, setEditing] = useState(false);
  const [oldestTreasure, setOldestTreasure] = useState("N/A");
  const [newestTreasure, setNewestTreasure] = useState("N/A");

  try {
    useEffect(() => {
      setUserName(localStorage.getItem("username"));
    }, []);

    useEffect(() => {
      fetch("https://oidc.mit.edu/userinfo", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          Accept: "application/json, text/plain, */*",
        },
      }).then((response) => {
        if (response.ok)
          response.json().then((data) => {
            setUserinfo(data);
          });
        else router.replace({ pathname: "/logout" });
      });
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
            if (data.length) {
              setNewestTreasure(data[0]["found_at"]);
              setOldestTreasure(data[data.length - 1]["found_at"]);
            }
            setTreasuresFound(data);
          });
        else router.replace({ pathname: "/logout" });
      });
    }, []);

    useEffect(() => {
      fetch("https://waldobook.herokuapp.com/user", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("id_token"),
          Accept: "application/json, text/plain, */*",
        },
      }).then((response) => {
        if (response.ok)
          response.json().then((data) => {
            setUserCost(data["costume"]);
          });
        else router.replace({ pathname: "/logout" });
      });
    }, []);

    useEffect(() => {
      if (userCost === null) {
        setUserCost("000");
      }
    }, [userCost]);

    function incGlasses() {
      let curGlasses = parseInt(userCost.slice(0, 1));
      if (curGlasses === 3) {
        return;
      } else {
        let newCost = (curGlasses + 1).toString() + userCost.slice(1);
        setUserCost(newCost);
      }
    }
    function decGlasses() {
      let curGlasses = parseInt(userCost.slice(0, 1));
      if (curGlasses === 0) {
        return;
      } else {
        let newCost = (curGlasses - 1).toString() + userCost.slice(1);
        setUserCost(newCost);
      }
    }

    function activeEditing() {
      setEditing(true);
    }

    function inactiveEditing() {
      setEditing(false);
    }

    function saveCostume() {
      fetch(
        "https://waldobook.herokuapp.com/user/costume/update?costume=" +
          userCost,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("id_token"),
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      setEditing(false);
    }

    return (
      <div className="Profile-wrapper">
        <MainNavBar username={userName} />
        <Image className="Profile-scroll" src={scroll} />
        <div className="Avatar-container">
          <Avatar new_costume={userCost} />
          {editing && (
            <div>
              <div
                className="Profile-arrowRight"
                style={{ left: "240px", top: "110px" }}
                onClick={incGlasses}
              >
                &gt;
              </div>
              <div
                className="Profile-arrowLeft"
                style={{ left: "-40px", top: "110px" }}
                onClick={decGlasses}
              >
                &lt;
              </div>
              <div
                className="Profile-button"
                style={{ left: "45px", top: "275px" }}
                onClick={inactiveEditing}
              >
                Cancel
              </div>
              <div
                className="Profile-button"
                style={{ left: "125px", top: "245px" }}
                onClick={saveCostume}
              >
                Save
              </div>
            </div>
          )}
          {!editing && (
            <div
              className="Profile-button"
              style={{ left: "75px", top: "275px" }}
              onClick={activeEditing}
            >
              Edit
            </div>
          )}
        </div>

        <div className="Profile-stats">
          <div className="Profile-statHeader">{userName}&apos;s Profile</div>
          <div className="Profile-statItems">
            # of Treasures Found: {treasuresFound.length}
          </div>
          <div className="Profile-statItems">
            Recent Treasure Find: {newestTreasure.slice(0, 10)}
          </div>
          <div className="Profile-statItems">
            Oldest Treasure Find: {oldestTreasure.slice(0, 10)}
          </div>
        </div>
      </div>
    );
  } catch {
    useEffect(() => {
      setUserName(localStorage.getItem("username"));
    }, []);

    useEffect(() => {
      fetch("https://oidc.mit.edu/userinfo", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          Accept: "application/json, text/plain, */*",
        },
      }).then((response) => {
        if (response.ok)
          response.json().then((data) => {
            setUserinfo(data);
          });
        else router.replace({ pathname: "/logout" });
      });
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
            if (data.length) {
              setNewestTreasure(data[0]["found_at"]);
              setOldestTreasure(data[data.length - 1]["found_at"]);
            }
            setTreasuresFound(data);
          });
        else router.replace({ pathname: "/logout" });
      });
    }, []);

    useEffect(() => {
      fetch("https://waldobook.herokuapp.com/user", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("id_token"),
          Accept: "application/json, text/plain, */*",
        },
      }).then((response) => {
        if (response.ok)
          response.json().then((data) => {
            setUserCost(data["costume"]);
          });
        else router.replace({ pathname: "/logout" });
      });
    }, []);

    return (
      <div className="Profile-wrapper">
        <MainNavBar username={userName} />
        <Image className="Profile-scroll" src={scroll} />
        <div className="Avatar-container">
          <Avatar new_costume="000" />
        </div>
        <div className="Profile-stats">
          <div className="Profile-statHeader">{userName}&apos;s Profile</div>
          <div className="Profile-statItems">
            # of Treasures Found: {treasuresFound.length}
          </div>
          <div className="Profile-statItems">
            Recent Treasure Find: {newestTreasure.slice(0, 10)}
          </div>
          <div className="Profile-statItems">
            Oldest Treasure Find: {oldestTreasure.slice(0, 10)}
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await User.find({});
  const users = result.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  });
  console.log(users);
  return { props: { users: users } };
}

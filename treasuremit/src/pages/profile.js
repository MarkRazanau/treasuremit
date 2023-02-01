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
  const [userName, setUserName] = useState("Profile");
  const [treasuresFound, setTreasuresFound] = useState([]);

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
          setTreasuresFound(data);
        });
      else router.replace({ pathname: "/logout" });
    });
  }, []);

  return (
    <div className="Profile-wrapper">
      <MainNavBar username={userName} />
      <Image className="Profile-scroll" src={scroll} />
      <div className="Avatar-container">
        <Avatar />
      </div>
      <div className="Profile-stats">
        <div className="Profile-statHeader">{userName}&apos;s Profile</div>
        <div className="Profile-statItems">
          # of Treasures Found: {treasuresFound.length}
        </div>
      </div>
    </div>
  );
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

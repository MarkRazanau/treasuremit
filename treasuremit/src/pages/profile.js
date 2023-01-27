import React from "react";
import MainNavBar from "../../components/MainNavBar";
import dbConnect from "../../lib/dbConnect";
import User from "./api/models/User";

export default function Profile({ users }) {
  console.log(users);

  return (
    <div className="Profile-wrapper">
      <MainNavBar />
      <div>Welcome to your profile page!</div>
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

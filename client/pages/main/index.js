import React from "react";
import CreateJoinHackathon from "../../components/create-join-hackathon";
import MyHackathons from "../../components/MyHackathons";
import axios from "axios";

const index = () => {
  const data = async () => {
    const res = await axios.get("/");
    return res.data;
  };

  return (
    <div>
      <CreateJoinHackathon />
      <MyHackathons />
    </div>
  );
};

export default index;

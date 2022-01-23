import React, { useState, useEffect } from "react";
import CreateJoinHackathon from "../../components/create-join-hackathon";
import axios from "axios";
import HackathonCard from "../../components/HackathonCard";
import Navbar from "../../components/Navbar";

const index = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(async () => {
    const userId = localStorage.getItem("userId");
    const data2 = await axios.get(
      `http://localhost:8080/api/infra/user/${userId}/hackathon`,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    setHackathons(data2.data);
  }, []);

  return (
    <div>
      <Navbar />
      <CreateJoinHackathon />

      {hackathons.length === 0 ? (
        <div>Loading...</div>
      ) : (
        hackathons.map((hackathon) => {
          return <HackathonCard hackathon={hackathon} />;
        })
      )}
    </div>
  );
};

export default index;

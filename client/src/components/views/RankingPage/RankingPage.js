import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import RankingBoard from "./Sections/RankingBoard";

export default function RankingPage(props) {
  const target = props.match.params.target;
  const [rankData, setRankData] = useState([]);
  const [tabValue, setTabValue] = useState(false);
  const handleChange = (event) => {
    setTabValue(!tabValue);
  };

  const getUserRank = () => {
    return Axios.get("/api/ranking/user");
  };

  const getGroupRank = () => {
    return Axios.get("/api/ranking/group");
  };

  const getUserRankData = () => {
    const userRankArray = new Promise((resolve, reject) => {
      const userRankData = getUserRank();
      resolve(userRankData);
    });
    userRankArray.then((response) => {
      const userRankData = response.data.result;
      //console.log(userRankData);
      setRankData(userRankData);
    });
  };

  const getGroupRankData = () => {
    const groupRankArray = new Promise((resolve, reject) => {
      const groupRankData = getGroupRank();
      resolve(groupRankData);
    });
    groupRankArray.then((response) => {
      const groupRankData = response.data.result;
      // console.log(groupRankData);
      setRankData(groupRankData);
    });
  };

  useEffect(() => {
    switch (target) {
      case "user":
        getUserRankData();
        setTabValue(false);
        break;
      case "group":
        getGroupRankData();
        setTabValue(true);
        break;
      default:
    }
  }, [target]);

  if (rankData.length === 0) {
    // console.log(rankData);
    return <></>;
  } else {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "calc(100vh - 9rem - 1px)",
          overflow: "hidden",
        }}
      >
        <br />
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            value={false}
            label="유저 랭킹"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
            component={Link}
            to={"/ranking/user"}
          />
          <Tab
            value={true}
            label="그룹 랭킹"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
            component={Link}
            to={"/ranking/group"}
          />
        </Tabs>

        <RankingBoard
          rankData={rankData}
          tabValue={tabValue}
        />
      </Container>
    );
  }
}

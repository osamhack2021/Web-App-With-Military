import React from "react";
import { Grid } from "@mui/material";
import TopScoreCard from "./TopScoreCard";
import WithIn5thScoreCard from "./WithIn5thScoreCard";
import ScoreTable from "./ScoreTable";
import defaultUserProfile from "../../../../static/imgs/user_profile.png";
import defaultGroupProfile from "../../../../static/imgs/group_profile.png";

function processUserRankData(userRankArray) {
  const processedArray = userRankArray.map((user, index) => {
    return {
      rank: index + 1,
      image: user.image ? user.image : defaultUserProfile,
      name: user.name,
      tier: user.tier,
      score: user.totalTime,
      link: `/users/${user._id}`,
    };
  });
  return processedArray;
}

function processGroupRankData(groupRankArray) {
  const processedArray = groupRankArray.map((group, index) => {
    return {
      rank: index + 1,
      image: group.image ? group.image : defaultGroupProfile,
      name: group.groupName,
      tier: group.tier,
      score: group.totalTime,
      link: `/groups/${group._id}`,
    };
  });
  return processedArray;
}

export default function RankingBoard({ rankData, tabIndex, tabValue }) {
  const rankList =
    tabValue === false
      ? processUserRankData(rankData)
      : processGroupRankData(rankData);

  return (
    <>
      <TopScoreCard data={rankList[0]} />
      <Grid container sx={{ backgroundColor: "#f1f8ff" }}>
        {rankList.slice(1, 5).map((item, index) => (
          <Grid item xs={3} key={index} sx={{ px: 2 }}>
            <WithIn5thScoreCard data={item} />
          </Grid>
        ))}
      </Grid>
      <ScoreTable rows={rankList.slice(5)} />
    </>
  );
}

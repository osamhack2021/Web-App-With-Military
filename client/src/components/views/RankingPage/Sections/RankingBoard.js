import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import TopScoreCard from './TopScoreCard';
import WithIn5thScoreCard from './WithIn5thScoreCard';
import ScoreTable from './ScoreTable';


function processUserRankData(userRankArray) {
  const processedArray = userRankArray.map((user, index) => {
    return { rank: index + 1,
             image: user.image,
             name: user.name,
             tier: '플레티넘',
             score: user.totalTime,
             link: `/users/${user._id}` }
  });
  return processedArray;
}

function processGroupRankData(groupRankArray) {
  const processedArray = groupRankArray.map((group, index) => {
    return { rank: index + 1,
             image: group.image,
             name: group.groupName,
             tier: '플레티넘',
             score: group.totalTime,
             link: `/groups/${group._id}` } 
  });   
  return processedArray;
}

export default function RankingBoard({rankData, tabIndex}) {
  const rankList = tabIndex === 0
      ? processUserRankData(rankData)
      : processGroupRankData(rankData);
  
  console.log(rankList);
  return (
    <>
      <TopScoreCard data={rankList[0]}/>
      <Grid container sx={{backgroundColor: '#f1f8ff',}}>
        {rankList.slice(1, 5).map((item, index) =>
          <Grid item xs={3} key={index} sx={{px: 2}} >
            <WithIn5thScoreCard data={item}/>
          </Grid>          
        )}
      </Grid>
      <ScoreTable rows={rankList.slice(5)}/>
    </>
  );
}
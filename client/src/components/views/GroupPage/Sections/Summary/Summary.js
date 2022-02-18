import Axios from "axios";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Divider, Link, Grid, Typography } from "@mui/material";
import Board from "./Board";
import PersonIcon from "@mui/icons-material/Person";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

const GrayBox = styled(Box)({
  backgroundColor: "#E8E8E8",
  borderRadius: "2.5rem",
  padding: "1rem",
});

export default function Summary({
  groupInfo,
  boardList,
  refreshComment,
  updateBoard,
}) {
  const [groupRankArray, setGroupRankArray] = useState([]);

  const findGroupIndex = (groupArray, group_id) => {
    return groupArray.findIndex((group) => group._id === group_id);
  };

  useEffect(() => {
    Axios.get("/api/ranking/group").then((response) => {
      if (response.data.success) {
        // console.log(response.data.result);
        setGroupRankArray(response.data.result);
      } else {
        alert("Failed");
      }
    });
  }, []);

  const myGroupRank = findGroupIndex(groupRankArray, groupInfo._id) + 1;

  // console.log(boardList);

  return (
    <Grid container spacing={4}>
      <Grid item xs={5} sx={{ "& > .MuiBox-root": { mb: 4 } }}>
        {/*그룹 랭킹*/}
        <GrayBox>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                mr: 1,
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              그룹 전체 랭킹
            </Typography>
            <EqualizerIcon sx={{ color: "#5E5E5E" }} />
            <Box sx={{ flexGrow: 1 }} />
            <Link
              href={"/ranking/group"}
              underline="none"
              sx={{
                display: "flex",
                color: "#5E5E5E",
                fontSize: "0.9rem",
              }}
            >
              <Typography>랭킹 자세히 보기</Typography>
              <ChevronRightIcon />
            </Link>
          </Box>
          <Divider />
          {/* Tier-bar */}
          <Box
            sx={{
              backgroundColor: "#C4C4C4",
              width: "100%",
              height: "2rem",
              borderRadius: "0.4rem",
              mt: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ECD351",
                width: `${
                  groupInfo.totalTime < 100 ? groupInfo.totalTime : 100
                }%`,
                textAlign: "center",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "0.4rem",
                padding: "0.1rem 0",
              }}
            >
              {groupInfo.totalTime}
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography sx={{ color: "#ECD351", fontWeight: "bold" }}>
              {groupInfo.totalTime}점 Gold
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography>
              <strong>
                상위{" "}
                {(((myGroupRank - 1) / groupRankArray.length) * 100).toFixed(1)}
                %
              </strong>
            </Typography>
          </Box>
          <Typography>
            이 그룹은 총 <strong>{groupRankArray.length}</strong>개의 그룹 중
            <strong> {myGroupRank}위</strong>입니다.
          </Typography>
        </GrayBox>
        {/*그룹 정보*/}
        <GrayBox>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                mr: 1,
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              정보
            </Typography>
            <PersonIcon sx={{ color: "#5E5E5E" }} />
          </Box>
          <Divider />
          <Typography>{groupInfo.info}</Typography>
        </GrayBox>
        {/*집중중인 멤버*/}
        <GrayBox>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                mr: 1,
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              집중중인 멤버
            </Typography>
            <TimerOutlinedIcon sx={{ color: "#5E5E5E" }} />
          </Box>
          <Divider />
          <Typography>{/*현재 참여하고 있는 인원*/}</Typography>
        </GrayBox>
      </Grid>

      {/*게시판*/}
      <Grid item xs={7}>
        <GrayBox>
          {boardList &&
            boardList.map((board) => (
              <>
                <Board
                  groupInfo={groupInfo}
                  boardInfo={board}
                  refreshComment={refreshComment}
                  updateBoard={updateBoard}
                />
                <Divider sx={{ my: 3 }} />
              </>
            ))}
        </GrayBox>
      </Grid>
    </Grid>
  );
}

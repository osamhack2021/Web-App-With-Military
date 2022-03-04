import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
  const [groupRankList, setGroupRankList] = useState([]);
  const [activeUserList, setActiveUserList] = useState([]);
  const [activeTimeObj, setActiveTimeObj] = useState({});
  const timerList = useRef({});

  const getElapsedTime = (start_time, pause_time) => {
    const startTime = new Date(start_time);
    const pauseTime = new Date(pause_time);
    const timeDiff = Math.floor(
      (pauseTime.getTime() - startTime.getTime()) / 1000
    );
    return timeDiff;
  };

  const findGroupIndex = (groupArray, group_id) => {
    return groupArray.findIndex((group) => group._id === group_id);
  };

  const getGroupRank = async () => {
    await Axios.get("/api/ranking/group").then((response) => {
      if (response.data.success) setGroupRankList(response.data.result);
    });
  };

  const getUser = (user_id) => {
    return Axios.post("/api/users/profile", { userId: user_id });
  };

  const getActiveUserList = (userArray) => {
    const activeUsers = userArray.map(
      (user, index) =>
        new Promise((resolve, reject) => {
          const userData = getUser(user._id);
          resolve(userData);
        })
    );
    Promise.all(activeUsers).then((users) => {
      function addTick(user_data) {
        setActiveTimeObj((prev) => {
          const previousTime = prev[user_data._id];
          return { ...prev, [user_data._id]: previousTime + 1 };
        });
      }
      const userDataArray = users.map((user) => user.data.user);
      setActiveUserList(userDataArray);

      //타이머 onStop시 해당 userData가 사라지므로 찾아서
      //activeTimeObj 시간 재 설정
      const stoppedUserData = activeUserList.find(
        (userData) => userDataArray.indexOf(userData) !== 1
      );
      if (stoppedUserData) {
        setActiveTimeObj((prev) => {
          return { ...prev, [stoppedUserData._id]: 0 };
        });
      }

      userDataArray.map((userData) => {
        if (userData.pauseTime === null) {
          console.log(timerList.current[userData._id]);
          if (!timerList.current[userData._id]) {
            timerList.current[userData._id] = setInterval(
              () => addTick(userData),
              1000
            );
          }
        } else {
          if (timerList.current[userData._id]) {
            console.log("장비를 정지합니다");
            clearInterval(timerList.current[userData._id]);
            timerList.current[userData._id] = null;
          }
          const measuringTime = getElapsedTime(
            userData.startTime,
            userData.pauseTime
          );
          setActiveTimeObj((prev) => {
            return { ...prev, [userData._id]: measuringTime };
          });
        }
        console.log(userData);
      });
    });
  };

  useEffect(() => {
    getGroupRank();
    getActiveUserList(groupInfo.activeUsers);
  }, [groupInfo]);

  const myGroupRank = findGroupIndex(groupRankList, groupInfo._id) + 1;

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
                height: "2rem",
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
              {groupInfo.totalTime}점 {groupInfo.tier}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography>
              <strong>
                상위&nbsp;
                {(((myGroupRank - 1) / groupRankList.length) * 100).toFixed(1)}%
              </strong>
            </Typography>
          </Box>
          <Typography>
            이 그룹은 총 <strong>{groupRankList.length}</strong>개의 그룹 중
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
          {activeUserList.map((userData) => (
            <Box key={userData._id} sx={{ display: "flex" }}>
              <Typography>{userData.name}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography
                sx={{
                  color: "#4DBA58",
                  fontWeight: "bold",
                }}
              >
                {activeTimeObj[userData._id]
                  ? activeTimeObj[userData._id]
                  : "측정중 입니다..."}
              </Typography>
            </Box>
          ))}
        </GrayBox>
      </Grid>

      {/*게시판*/}
      <Grid item xs={7}>
        <GrayBox>
          {boardList &&
            boardList.map((board) => (
              <Board
                key={board._id}
                boardInfo={board}
                groupInfo={groupInfo}
                refreshComment={refreshComment}
                updateBoard={updateBoard}
              />
            ))}
        </GrayBox>
      </Grid>
    </Grid>
  );
}

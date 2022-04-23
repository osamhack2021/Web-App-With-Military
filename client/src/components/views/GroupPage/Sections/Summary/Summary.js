import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Divider, Link, Grid, Typography } from "@mui/material";
import { profileGroup } from "../../../../../_actions/user_actions";
import Board from "./Board";
import PersonIcon from "@mui/icons-material/Person";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import defaultUserProfile from "../../../../../static/imgs/user_profile.png";
import TierBar from "../../../../commons/TierBar";
import TierText from "../../../../commons/TierText";

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
  const groupId = groupInfo._id;
  const dispatch = useDispatch();
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
    return Axios.post("/api/users/profile", {userId: user_id});
  }

  const updateGroup = (group_id) => {
    dispatch(profileGroup({ groupId: group_id })).then((response) => {
      if (!response.payload.success)
        alert("Fail to dispatch group data.");
    });
  };

  const addTick = (user_data) => {
    setActiveTimeObj((prev) => {
      const previousTime = prev[user_data._id];
      return {...prev, [user_data._id]: previousTime + 1 }
    });
  }
  
  const visualizeActiveUsers = (userArray) => {
    
    const activeUsers = userArray.map((user, index) =>
      new Promise((resolve, reject) => {
        const userData = getUser(user._id);
        resolve(userData);
      })
    );
    Promise.all(activeUsers).then((users) => {
      const activeUserArray = users.map((user) => user.data.user);
      setActiveUserList(activeUserArray);
      
      //타이머 onStop시 해당 userData가 사라지므로 찾아서
      //activeTimeObj 시간 재 설정
      const userDataStopped = activeUserList.find((aciveUserData) => {
        return activeUserArray.findIndex((user_data) => user_data._id === aciveUserData._id) === -1
      })
      if(userDataStopped) {
        setActiveTimeObj((prev) => {
          return {...prev, [userDataStopped._id]: 0 }
        });
      }

      activeUserArray.map((userData) => {  
        //if user start or resume or stop timer
        if(userData.pauseTime === null) {
          if (!timerList.current[userData._id]) {
            timerList.current[userData._id] = setInterval(
              () => addTick(userData),
              1000
            );
          }
        } else {
        //if user pause timer
          //remove timer intervel
          if (timerList.current[userData._id]) {
            clearInterval(timerList.current[userData._id]);
            timerList.current[userData._id] = null;
          }
          //set measuring time
          const measuringTime = getElapsedTime(userData.startTime, userData.pauseTime);
          setActiveTimeObj((prev) => {
            return { ...prev, [userData._id]: measuringTime };
          });
          
        }
      })
    })
  }
  useEffect(() => {
    getGroupRank();
  }, []);

  //group정보가 업데이트되면 실행함
  useEffect(()=> {
    visualizeActiveUsers(groupInfo.activeUsers);
  }, [groupInfo]);

  //1초마다 업데이트하는 코드
  useEffect(() => {
    const id = setInterval(() => {
      updateGroup(groupId);
      return () => clearInterval(id);
    }, 1000)
  }, []);
  
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
          <Divider sx={{my : 0.5}}/>

          <TierBar point={groupInfo.totalTime} />

          <Box sx={{ display: "flex" }}>
            <TierText
              point={groupInfo.totalTime}
              tier={groupInfo.tier}
              variant={"h7"}
            />
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
          {activeUserList.map((userData) => 
            <Box key={userData._id} sx={{
              display: "flex",
              my: 2,
              alignItems: "center"
            }}>
              <Avatar
                src={userData.image ? userData.image : defaultUserProfile}
                sx={{
                  width: "2rem",
                  height: "2rem",
                  mr: 2,
                }}
              />
              <Typography>{userData.name}</Typography>
              <Box sx={{flexGrow: 1}}/>
              <Box sx={{
                my: 'auto',
                mx: "4px",
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: userData.pauseTime ? "#FDA95B" : "#4DBA58",
              }} />
              <Typography sx={{
                color: userData.pauseTime ? "#FDA95B" : "#4DBA58",
                fontWeight: "bold"
              }}>
                { activeTimeObj[userData._id]
                ? <>
                    {parseInt(activeTimeObj[userData._id]/3600)
                      ? parseInt(activeTimeObj[userData._id]/3600) + ":"
                      : null}
                    {parseInt(activeTimeObj[userData._id]%3600/60)
                      ? parseInt(activeTimeObj[userData._id]%3600/60) + ":"
                      : null}
                    {activeTimeObj[userData._id]%60}
                  </>
                : "측정중 입니다..."}
              </Typography>
            </Box>
          )}
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

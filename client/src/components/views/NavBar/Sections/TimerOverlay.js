import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
} from "@mui/material";
import {
  profileUser,
  profileGroup,
  timerStatus,
  timerStart,
  timerEnd,
  timerPause,
  timerResume,
} from "../../../../_actions/user_actions";
import { ReactComponent as Dial } from "../../../../static/imgs/dial.svg";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import defaultGroupProfile from "../../../../static/imgs/group_profile.png";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: 300,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper
}));

export default function TimerOverlay() {
  const dispatch = useDispatch();

  const [elapsedTime, setElapsedTime] = useState(0);
  const [Pause, setPause] = useState(false);
  const [Studying, setStudying] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groupRef = useRef([]);

  const user_id = localStorage.getItem("userId");
  const userData = useSelector((state) => state.profile.userProfile);

  const findGroup = (groupArray, group_id) => {
    const selectedGroup = groupArray.find((group) => {
      return group._id === group_id;
    });
    return selectedGroup;
  };
  const handleGroup = (event, groupArray, index) => {
    const myGroup = findGroup(groupArray, groupRef.current[index].id);
    setSelectedGroup(myGroup);
  };

  const updateGroup = (group_id) => {
    dispatch(profileGroup({ groupId: group_id }))
    .then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("Fail to dispatch group data.");
      }
    });
  }
  
  useEffect(() => {
    dispatch(profileUser({ userId: user_id })).then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      }
    });
  }, [Studying]);

  useEffect(() => {
    dispatch(timerStatus()).then((response) => {
      if (response.payload.success) {
        if (response.payload.isStudyingNow) {
          setElapsedTime(response.payload.elapsedTime);
          setPause(response.payload.isPaused);
          setSelectedGroup(response.payload.activeGroup);
        }
        setStudying(response.payload.isStudyingNow);
      } else {
        alert("공부상태 가져오기 실패");
      }
    });
  }, []);

  // 타이머 시간 누적
  useInterval(
    () => {
      setElapsedTime((prev) => prev + 1);
    },
    Studying && !Pause ? 1000 : null
  );

  const makeListItem = (groupArray, groupData, index) => {
    return (
      <ListItem key={index} disablePadding>
        <ListItemAvatar>
          <Avatar
            alt="Group Profile Avatar"
            src={groupData.image ? groupData.image : defaultGroupProfile}
          />
        </ListItemAvatar>
        <Grid container>
          <Grid xs={6}>
            <Typography>{groupData.groupName}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography
              align="right"
              sx={{
                pr: 1,
                fontWeight: "medium",
              }}
            >
              {parseInt(elapsedTime / 3600)}:
              {parseInt((elapsedTime % 3600) / 60)}:
              {elapsedTime % 60}
            </Typography>
          </Grid>
          <Grid xs={6} sx={{ display: "flex" }}>
            <MenuBookIcon sx={{ mr: 1 }} />
            <Typography>0연속</Typography>
          </Grid>
          <Grid
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {Studying ? (
              <Button disabled></Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                id={groupData._id}
                ref={(el) => (groupRef.current[index] = el)}
                onClick={(e) => {
                  //groupRef.current[index].focus();
                  handleGroup(e, groupArray, index);
                }}
                sx={{
                  mr: 1,
                  width: "4.5rem",
                  height: "1.5rem"
                }}
              >
                <Typography sx={{
                  whiteSpace: "nowrap",
                  fontSize: "0.75rem"
                }}>
                  그룹 선택
                </Typography>
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              href={`/groups/${groupData._id}`}
              sx={{
                width: "4.5rem",
                height: "1.5rem"
              }}
            >
              <Typography sx={{
                whiteSpace: "nowrap",
                fontSize: "0.75rem"
              }}>
                그룹 이동
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  const makeGroupList = (groupArray) =>
    groupArray.map((groupData, index) =>
      makeListItem(groupArray, groupData, index)
    );

  const onStart = (event, group_id) => {
    event.preventDefault();
    dispatch(timerStart({ groupId: group_id })).then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
        setElapsedTime(response.payload.elapsedTime);
        setStudying(response.payload.isStudyingNow);
        updateGroup(group_id);
      }
    });
    
  };

  const onStop = (event, group_id) => {
    event.preventDefault();
    dispatch(timerEnd()).then((response) => {
      if (response.payload.success) {
        setElapsedTime(0);
        setStudying(false);
        setPause(false);
        window.localStorage.setItem(
          "timerData",
          JSON.stringify({
            success: response.payload.success,
            activeGroup: response.payload.activeGroup,
            elapsedTime: response.payload.elapsedTime,
          })
        );
        updateGroup(group_id);
      } else {
        alert(response.payload.message);
      }
    });
  };

  const onPause = (event) => {
    event.preventDefault();
    dispatch(timerPause()).then((response) => {
      if (response.payload.success) {
        setElapsedTime(response.payload.elapsedTime);
        setPause(true);
      } else {
        alert(response.payload.message);
      }
    });
  };

  const onResume = (event) => {
    event.preventDefault();
    dispatch(timerResume()).then((response) => {
      if (response.payload.success) {
        setElapsedTime(response.payload.elapsedTime);
        setPause(false);
      } else {
        alert(response.payload.message);
      }
    });
  };

  if (userData === undefined) {
    return <div>정보 불러오는 중</div>;
  } else {
    const { groupList } = userData.user;
    return (
      <Item>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          {selectedGroup === null ? (
            <Typography sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}>
              그룹을 선택해주세요
            </Typography>
          ) : (
            <>
              <Avatar
                alt="Group Profile Image"
                src={selectedGroup.image ? selectedGroup.image : defaultGroupProfile}
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "13px",
                  mr: "0.5rem",
                }}
              />
              <Typography sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}>
                {selectedGroup.groupName}
              </Typography>
            </>
          )}
        </Box>

        <Box sx={{
          textAlign: "center",
          position: "relative",
        }}>
          <Box sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}>
            <Typography sx={{
              fontSize: "1rem",
              fontWeight: "500",
            }}>
              {elapsedTime}초
            </Typography>
          </Box>
          <Dial style={{
            borderRadius: '1.5rem'
          }} />
        </Box>

        {selectedGroup && (
          <Box sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}>
            <IconButton
              onClick={
                !Studying
                  ? (e) => {
                      onStart(e, selectedGroup._id);
                    }
                  : Pause
                  ? onResume
                  : onPause
              }
              sx={{p: 0}}
            >
              {!Studying 
                ? <PlayCircleFilledWhiteIcon sx={{fontSize: "3rem"}}/>
                : Pause
                ? <PlayCircleFilledWhiteIcon sx={{fontSize: "3rem"}}/>
                : <PauseCircleIcon sx={{fontSize: "3rem"}}/>}
            </IconButton>
            <IconButton
              onClick={(e) => {onStop(e, selectedGroup._id)}}
              sx={{p: 0,}}
            >
              <StopCircleIcon sx={{fontSize: "3rem"}}/>
            </IconButton>
          </Box>
        )}
        
        <Box>
          {makeGroupList(groupList)}
        </Box>
      </Item>
    );
  }
}

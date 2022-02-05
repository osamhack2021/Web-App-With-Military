import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import {
  Avatar, Box, Button, Grid,
  Link, ListItem, ListItemText, ListItemAvatar, ListItemButton,
  Paper, Stack, Typography
} from '@mui/material';
import { profileUser, timerStatus, timerStart, timerEnd, timerPause, timerResume } from "../../../../_actions/user_actions";
import { ReactComponent as Dial } from '../../../../static/imgs/dial.svg';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
	width: 400,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TimerOverlay() {
  const dispatch = useDispatch();

  const [ElapsedTime, setElapsedTime] = useState(0);
  const [Pause, setPause] = useState(false);
  const [Studying, setStudying] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groupRef = useRef([]);
  
  const user_id = localStorage.getItem('userId');
  const userData = useSelector((state) => state.profile.userProfile);
  

  const findGroup = (groupArray, group_id) => {
    const selectedGroup =
    groupArray.find( (group) => {
        return group._id === group_id;
    })
    return selectedGroup
  }
  const handleGroup = (event, groupArray, index) => {
    const myGroup = findGroup(groupArray, groupRef.current[index].id)
    setSelectedGroup(myGroup);
  }

  
  useEffect(() => {
    dispatch(profileUser({userId : user_id }))
      .then(response => {
          if (response.payload.success) {
              //console.log(response.payload);
          }
      });
  }, [Studying]);

  useEffect(() => {
    dispatch(timerStatus())
      .then( response => {
        if (response.payload.success) {
          if(response.payload.isStudyingNow) {
            setElapsedTime(response.payload.elapsedTime)
            setPause(response.payload.isPaused)
          }
          setStudying(response.payload.isStudyingNow)
        } else {
          alert('공부상태 가져오기를 실패했습니다.');
        }
      });
	}, []);

  // 타이머 시간 누적
	useInterval(
    () => { setElapsedTime(ElapsedTime+1); },
    (Studying && !Pause) ? 1000 : null
  );

  const makeListItem = (groupArray, groupData, index) => {
    return (
      <ListItem
        key={index}
        sx={{}}
        disablePadding
        >
        <ListItemAvatar>
          <Avatar 
            alt="Group Profile Avatar"
            src={groupData.image}
            sx={{ }}
          />
        </ListItemAvatar>
        <Grid container>
          <Grid xs={6}>
            <Typography>
              {groupData.groupName}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography align="right"
              sx={{
                pr : 1,
                fontWeight: 'medium',
              }}
            >
              { parseInt(groupData.totalTime/3600) }:
              { parseInt((groupData.totalTime%3600)/60) }:
              { groupData.totalTime%60 }
            </Typography>
          </Grid>
          <Grid 
            xs={6}
            sx={{ display: 'flex' }}
          >
            <MenuBookIcon sx={{ mr:1 }}/>
            <Typography>
              0연속
            </Typography>
          </Grid>
          <Grid
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              id={groupData._id}
              ref={el => (groupRef.current[index] = el)}
              onClick={
                (e)=>{
                  //groupRef.current[index].focus();
                  handleGroup(e, groupArray, index);
                }
              }
              sx={{ mr:1 }}
            >
              <Typography sx={{
                whiteSpace: 'nowrap',
              }}>
                시간 재기
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              href={`/groups/${groupData._id}`}
            >
              <Typography sx={{
                whiteSpace: 'nowrap',
              }}>
                그룹 이동
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    );
  } 

  const makeGroupList = (groupArray) => groupArray.map((groupData, index) => makeListItem(groupArray, groupData, index))

  const onStart = (event, group_id) => {
		event.preventDefault();
    dispatch(timerStart({groupId: group_id}))
      .then(response => {
        if(response.payload.success) {
          console.log(response.payload);
          setElapsedTime(response.payload.elapsedTime)
          setStudying(response.payload.isStudyingNow)
        } else {
          alert(response.payload.message)
        }
      })
	}
	
	const onStop = (event) => {
		event.preventDefault();
    dispatch(timerEnd())
      .then(response => {
        if(response.payload.success) {
          console.log(response.payload);
          setElapsedTime(0)
          setStudying(false)
          setPause(false)
          window.localStorage.setItem('timerData', JSON.stringify({
            success: response.payload.success,
            activeGroup: response.payload.activeGroup,
            elapsedTime: response.payload.elapsedTime
          }));
        } else {
          alert(response.payload.message)
        }
      })
	}
	
	const onPause = (event) => {
		event.preventDefault();
    dispatch(timerPause())
			.then(response => {
			if(response.payload.success) {
				setElapsedTime(response.payload.elapsedTime)
				setPause(true)
			} else {
				alert(response.payload.message)
			}
		})
	}
	
	const onResume = (event) => {
    event.preventDefault();
    dispatch(timerResume())
      .then(response => {
      if(response.payload.success) {
        setElapsedTime(response.payload.elapsedTime)
        setPause(false)
      } else {
        alert(response.payload.message)
      }
    })
	}


  if (userData === undefined) {
    return (
        <div>유저정보 불러오는 중</div>
    );
  } else {
    const { groupList } = userData.user;
    return (
      <Stack sx={{
        color: '#e6e1e0',
        margin: 'auto',
      }}>
        <Item sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          { selectedGroup === null ? 
            <Typography sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}>
              그룹을 선택해주세요
            </Typography> : 
            <>
              <Avatar
                alt="Group Profile Image"
                src={selectedGroup.image}
                sx={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '13px',
                  mr: '0.5rem',
                }}
              />
              <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}>
                {selectedGroup.groupName}
              </Typography>
            </> }
        </Item>

        <Item sx={{
          textAlign: 'center',
          position: 'relative',
        }}>
          <Box sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Typography sx={{
              fontSize: '1rem',
              fontWeight: '500',
            }}>
              {ElapsedTime}초
            </Typography>
          </Box>
          <Dial style={{
            // background: 'radial-gradient(116.7% 116.7% at 127.95% -2.95%, #FFFFFF 0%, #073113 100%)',
            // borderRadius: '24px',
            // transform: 'rotate(-90deg)'
          }} />
        </Item>

      {selectedGroup && 
        <Item sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: '#FF4545',
              width: '156px',
              height: '42px',
              margin: 'auto',
              borderRadius: '8px',
            }}
            onClick={!Studying ? (e) => {onStart(e, selectedGroup._id)} : (Pause ? onResume : onPause)}
          >
            <Typography>
              {!Studying? '시작하기' : Pause ? '계속하기' : '일시정지'}
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: '#5ED0A7',
              width: '156px',
              height: '42px',
              margin: 'auto',
              borderRadius: '8px',
            }}
            onClick={onStop}
          >
            <Typography>기록하기</Typography>
          </Button>
        </Item>
      }
        <Item>
          { makeGroupList(groupList) }
        </Item>
      </Stack>
    );
  }
};
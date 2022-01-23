import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar, Box, Button, Grid,
  Link, ListItem, ListItemText, ListItemAvatar, ListItemButton,
  Paper, Stack, Typography
} from '@mui/material';
import { studyingStatus, studyingStart, studyingEnd, studyingPause, studyingResume } from "../../../../_actions/user_actions";
import { ReactComponent as Dial } from '../../../../static/imgs/dial.svg';
import Axios from 'axios';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//import useElapsedTime from '../../hooks/useElapsedTime';

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
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TimerOverlay({groupList}) {
  const [ElapsedTime, setElapsedTime] = useState(0);
  const [Pause, setPause] = useState(false);
  const [Studying, setStudying] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const groupRef = useRef([]);

  const findGroup = (groupArray, groupId) => {
    const selectedGroup =
    groupArray.find( (group) => {
        return group._id === groupId;
    })
    return selectedGroup
  }
  const handleGroup = (event, index) => {
    const myGroup = findGroup(groupList, groupRef.current[index].id)
    setSelectedGroup(myGroup);
    setElapsedTime(myGroup.totalTime);
  }
  const makeListItem = (groupData, index) => {
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
                  groupRef.current[index].focus();
                  handleGroup(e, index);
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

  useEffect(() => {
    dispatch(studyingStatus())
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

  const onStart = (event, groupName) => {
		event.preventDefault();
    dispatch(studyingStart({groupName: groupName}))
      .then(response => {
        if(response.payload.success) {
          setElapsedTime(response.payload.elapsedTime)
          setStudying(response.payload.isStudyingNow)
        } else {
          alert(response.payload.message)
        }
      })
	}
	
	const onStop = (event) => {
		event.preventDefault();
    dispatch(studyingEnd())
      .then(response => {
        if(response.payload.success) {
          setElapsedTime(response.payload.elapsedTime)
          setStudying(false)
          setPause(false)
        } else {
          alert(response.payload.message)
        }
		  })
	}
	
	const onPause = (event) => {
		event.preventDefault();
    dispatch(studyingPause())
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
    dispatch(studyingResume())
			.then(response => {
			if(response.payload.success) {
				setElapsedTime(response.payload.elapsedTime)
				setPause(false)
			} else {
				alert(response.payload.message)
			}
		})
	}
  if (userData.userProfile === undefined) {
    return (
        <div>유저정보 불러오는 중</div>
    );
  } else {
    const {user} = userData.userProfile;
    //console.log(user);
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

        <Item sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: '3rem',
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
            onClick={!Studying ? (e) => {onStart(e, selectedGroup.groupName)} : (Pause ? onResume : onPause)}
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

        <Item>
          { user.groupList.map((group, index) => makeListItem(group, index)) }
        </Item>
      </Stack>
    );
  }
};
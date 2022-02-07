import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, removeBoard } from "../../../../_actions/user_actions";
import { Avatar, Box, Button, Grid, IconButton, Paper, Popper, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useConfirmDialog } from "react-mui-confirm";
import SummaryTab from "./SummaryTab/SummaryTab";
import TimerIcon from '@mui/icons-material/Timer';
import CreateIcon from '@mui/icons-material/Create';
import PanToolIcon from '@mui/icons-material/PanTool';
import PersonIcon from '@mui/icons-material/Person';


export default function CardTemplete({
  groupInfo,
  toggleFormOverlay,
  onFormOverlayToggle,
  handleSnackOpen,
}) {
	const dispatch = useDispatch();
  const confirm = useConfirmDialog();
	
	const loginData = useSelector((state) => state.auth.loginUserData);
	const [boardList, setBoardList] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [refreshComment, setRefreshComment] = useState(false);
  const [waitingList, setWaitingList] = useState([]);
  
  //popper code
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  //tab code
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  
	const toggleRefreshComment = () => {
    setRefreshComment((prev) => !prev);
	}
	
	const toggleEditMode = () => {
    setEditMode((prev) => !prev);
	}
	
  const updateBoard = (group_id) => {
    dispatch(loadBoard({ groupId: group_id }))
    .then((response) => {
      if (response.payload.success) {
        setBoardList(response.payload.boards);
        toggleRefreshComment();
      } else {
        alert("게시글 불러오기를 실패했습니다.");
      }
    });
  }

  const onClickEdit = (event, board) => {
    if (board.writerId._id === loginData._id) {
      toggleEditMode();
    } else {
      alert("작성자가 아닙니다.");
    }
  }
  const remove = (board) => {
    if (board.writerId._id === loginData._id) {
      dispatch(removeBoard({ boardId: board._id }))
      .then((response) => {
        if (response.payload.success) {
          console.log(response.payload);
          updateBoard(groupInfo._id);
        } else {
          alert("게시글 삭제에 실패했습니다.");
        }
      });
    } else {
      alert("작성자가 아닙니다.");
    }
  }
  
  const removeBoardOnConfirm = (e, board) =>
    confirm({
      title: "게시글을 정말로 삭제 하시겠습니까?",
      onConfirm: async () => {
        await remove(board);
      },
      confirmButtonProps: {
        color: "success"
      },
      cancelButtonProps: {
        color: "error"
      }
    });

  const join = () => {
    Axios.post('/api/groups/join', {groupId: groupInfo._id})
    .then((response) => {
      if (response.data.success) {  
        handleSnackOpen("success", response.data.message);
      } else {
        handleSnackOpen("error", response.data.message);
      }
    });
  }
  
  const approve = (user_id) => {
    Axios.post('/api/groups/approve', {groupId: groupInfo._id, userId: user_id})
    .then((response) => {
      if (response.data.success) {  
        handleSnackOpen("success", response.data.message);
      } else {
        handleSnackOpen("error", response.data.message);
      }
    });
  }
  
  const getUserName = (user_id) => {
    Axios.post('/api/users/profile', {userId: user_id})
    .then((response) => {
      if (response.data.success) {
        setWaitingList((waitingList) => [...waitingList, { name: response.data.user.name, id : user_id }]);
        return response.data.user.name;
      } else {
        return "대기유저정보 불러오기 실패";
      }
    });
  }
  
	useEffect(() => {
    groupInfo.waiting.map((userId) => { getUserName(userId) }
  )}, []);
  
	useEffect(() => {
    updateBoard(groupInfo._id)
  }, [toggleFormOverlay, editMode]);
	
  if(loginData === undefined) {
    return <div>데이터 불러오는 중</div>
  } else {
    return (
      <>
        {/*admins에 본인이 포함되지않으면 가입신청 버튼을 생성*/}
        { groupInfo.admins.indexOf(loginData._id) === -1 &&
        <Button
          variant="contained"
          onClick={join}
          color="secondary"
          sx={{
            borderRadius: '0.5rem',
            width: '11rem',
            height: '2.5rem',
            textTransform: 'none',
            mt: 3,
            position: 'absolute',
            right: '25%',
          }}  
        >
          <Typography sx={{
            mr: 1,
            fontSize: '1rem',
          }}>
            가입신청하기
          </Typography>
          <PanToolIcon />
        </Button> }

        <Button
          variant="contained"
          onClick={onFormOverlayToggle}
          color="secondary"
          sx={{
            borderRadius: '0.5rem',
            width: '11rem',
            height: '2.5rem',
            textTransform: 'none',
            mt: 3,
            position: 'absolute',
            right: '7%',
          }}  
        >
          <Typography sx={{
            mr: 1,
            fontSize: '1rem',
          }}>
            게시글작성
          </Typography>
          <CreateIcon />
        </Button>
        <Box sx={{
          ml: '20%',
          mr: '30%',
        }}>
          <Typography sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
          }}>
            {groupInfo.groupName}
          </Typography>

          <Box sx={{
            color: '#5E5E5E',
            display: 'flex',
          }}>
            <PersonIcon width="1rem" height="1rem" sx={{ mr: 0.5 }} />
            <Typography sx={{
              fontWeight: 'bold',
              py: '2px',
            }} >
              {groupInfo.members.length}
              /30
            </Typography>
            
            <Typography sx={{
              ml: 2,
              py: '2px',
            }}>
              대기인원: <strong>{ groupInfo.waiting.length }</strong>명
            </Typography>
            {/* waitingList가 없거나 admins에 자신이 없으면 승인영역을 생성하지 않음*/}
            { groupInfo.waiting && groupInfo.admins.indexOf(loginData._id) !== -1 && (
              <Box sx={{display: 'flex', ml: 2}}>
                <Button
                  aria-describedby={id}
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleClick}
                  sx={{ml : 2}}
                >
                  대기목록
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl} disablePortal>
                  <Paper sx={{
                    width: 150,
                    p: 2,
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}>
                    { waitingList.map((item) => 
                      <Box
                        key={item.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          my: 1
                        }}
                      >
                        <Typography sx={{mr: 2}}>{ item.name }</Typography>
                        <button
                          type="button"
                          onClick={() => { approve(item.id) } }
                        >
                          승인
                        </button>
                      </Box>
                    )}
                  </Paper>
                </Popper>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{
          mt: 2,
          mx: 6,
          p: 4,
        }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                <Tab label="개요" value="1" />
                <Tab label="랭킹" value="2" />
                <Tab label="업적" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SummaryTab 
                boardList={boardList}
                onClickEdit={onClickEdit}
                removeBoardOnConfirm={removeBoardOnConfirm}
                editMode={editMode}
                toggleEditMode={toggleEditMode}
                refreshComment={refreshComment}
              />
            </TabPanel>
            <TabPanel value="2">랭킹</TabPanel>
            <TabPanel value="3">업적</TabPanel>
          </TabContext>
        </Box>
      </>
    );
  }
}

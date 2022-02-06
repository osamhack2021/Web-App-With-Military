import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, removeBoard } from "../../../../_actions/user_actions";
import { Avatar, Box, Button, Grid, IconButton, Paper, Popper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useConfirmDialog } from "react-mui-confirm";
import EditBoard from "./EditBoard";
import Comment from "./Comment";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CreateIcon from '@mui/icons-material/Create';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PanToolIcon from '@mui/icons-material/PanTool';

const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

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
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  //
  
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
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
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

        <Box
          sx={{
            mt: 2,
            mx: 6,
            p: 4,
            borderTop: '1px solid #5E5E5E',
          }}
        >
          <Grid container spacing={4}
            sx={{
              '& .MuiGrid-root': {
                p: 2,
              },
            }}
          >
            <Grid item xs={5}>
              <GrayBox sx={{display: 'flex'}}>
                <Typography sx={{
                  mr: 1,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}>
                  그룹 전체 랭킹
                </Typography>
                <EqualizerIcon sx={{color: '#5E5E5E'}}/>
              </GrayBox>
            </Grid>

            <Grid item xs={7}>
              <GrayBox >
                <Typography>유저 이름</Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Typography>5시간</Typography>
                  <PublicIcon />
                </Box>
              </GrayBox>
            </Grid>

            <Grid item xs={5}>
              <GrayBox sx={{display: 'flex'}}>
                <Typography sx={{
                  mr: 1,
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                }}>
                  정보
                </Typography>
                <PersonIcon sx={{color: '#5E5E5E'}}/>
              </GrayBox>
            </Grid>
          </Grid>
        </Box>

        {	boardList &&
          boardList.map((board) => (
            <Box key={board._id}>
              <h2>제목 : {board.title}</h2>
              <Button onClick={(e) => { onClickEdit(e, board) }}>
                <EditOutlinedIcon />
                수정하기
              </Button>
              <Button onClick={(e) => { removeBoardOnConfirm(e, board) }} >
                <CloseOutlinedIcon />
                삭제하기
              </Button>
            
              <h3>
                작성자 : {board.writerId.name} 작성일 : {board.posted}
              </h3>
              <h3>내용 : {board.content}</h3>
              {editMode && (
                <form style={{ display: "flex", marginLeft: "40px" }}>
                  <EditBoard
                    board={board}
                    toggleEditMode={toggleEditMode}
                  />
                  <br />
                </form>
              )}
              <Comment
                boardId={board._id}
                refreshComment={refreshComment}
              />
            </Box>
        ))}
      </>
    );
  }
}

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useConfirmDialog } from 'react-mui-confirm';
import { removeBoard } from "../../../../../_actions/user_actions";
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import Comment from './Comment';
import EditBoard from './EditBoard';
import PublicIcon from '@mui/icons-material/Public';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Board({
  groupInfo,
  boardInfo,
  refreshComment,
  updateBoard
}) {
  
  const confirm = useConfirmDialog();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth.loginUserData);
  
  const [editMode, setEditMode] = useState(false);
  
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
	}
  const onClickEdit = () => {
    if (boardInfo.writerId._id === loginData._id) {
      toggleEditMode();
    } else {
      alert("작성자가 아닙니다.");
    }
  }
  
  const remove = (board_info) => {
    dispatch(removeBoard({ boardId: board_info._id }))
    .then((response) => {
      if (response.payload.success) {
        updateBoard(groupInfo._id);
      } else {
        alert("게시글 삭제에 실패했습니다.");
      }
    });
  }
  
  const removeBoardOnConfirm = (clickEvent, board_info) => {
    if (board_info.writerId._id === loginData._id) {
      return (
        confirm({
          title: "게시글을 정말로 삭제 하시겠습니까?",
          onConfirm: async () => {
            await remove(board_info);
          },
          confirmButtonProps: {
            color: "success"
          },
          cancelButtonProps: {
            color: "error"
          }
        })
      );
    } else {
      alert("작성자가 아닙니다.");
    }
  }
  
  useEffect(() => {
    updateBoard(groupInfo._id)
  }, [editMode]);
  
  
  const creationDate = new Date(boardInfo.posted);
  creationDate.setHours(creationDate.getHours() - 9);
  const now = new Date();
  const timeDiff = Math.floor((now.getTime() - creationDate.getTime())/1000);
  
  return (
    <Box key={boardInfo._id}>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h5">{boardInfo.title}</Typography>
        <Box sx={{flexGrow: 1}}/>
        <IconButton onClick={onClickEdit}>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={(e) => { removeBoardOnConfirm(e, boardInfo) }} >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex' }}>
        <Avatar src={boardInfo.writerId.image} sx={{mr: 1}}/>
        <Typography sx={{mr: 1}}>{boardInfo.writerId.name}</Typography>
        { parseInt(timeDiff/3600/24/365) ? <Typography>{parseInt(timeDiff/3600/24/365)}년 전</Typography> :
          parseInt(timeDiff/3600/24/30)  ? <Typography>{parseInt(timeDiff/3600/24/30)}달 전</Typography>  :
          parseInt(timeDiff/3600/24)     ? <Typography>{parseInt(timeDiff/3600/24)}일 전</Typography>     :
          parseInt(timeDiff/3600)        ? <Typography>{parseInt(timeDiff/3600)}시간 전</Typography>      :
          parseInt(timeDiff%3600/60)     ? <Typography>{parseInt(timeDiff%3600/60)}분 전</Typography>     :
                                           <Typography>방금 전</Typography>                     }
        <PublicIcon sx={{color: '#5E5E5E'}}/>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Typography>{boardInfo.content}</Typography>
      </Box>
      
      <Comment
        boardInfo={boardInfo}
        refreshComment={refreshComment}
      />
      
      {editMode && (
        <EditBoard
          boardInfo={boardInfo}
          toggleEditMode={toggleEditMode}
        />
      )}
    </Box>
  );
}

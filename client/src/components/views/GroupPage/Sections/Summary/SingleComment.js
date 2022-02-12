import React from "react";
import { removeComment } from "../../../../../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useConfirmDialog } from "react-mui-confirm";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function SingleComment( {
  commentInfo,
  boardId,
	updateComment
}) {
  const confirm = useConfirmDialog();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth.loginUserData);
	
  const remove = () => {
    dispatch(removeComment({ commentId: commentInfo._id }))
    .then((response) => {
      if (response.payload.success) {
        updateComment(boardId);
      } else {
        alert("댓글 삭제에 실패하였습니다.");
      }
    });
  }
  
  const removeCommentOnConfirm = () => {
  if (commentInfo.writerId._id === loginData._id) {
    return (
      confirm({
        title: "댓글을 정말로 삭제 하시겠습니까?",
        onConfirm: async () => {
          await remove();
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

  return (
    //본인이 아닌 댓글은 좌측으로 배치
    loginData._id === commentInfo.writerId._id
    ? <Box sx={{display: 'flex'}}>
        <Box sx={{flexGrow: 1}}/>
        <Box sx={{
          padding: '1rem 2rem 1rem 1rem',
          borderRadius: '1rem',
          backgroundColor: 'white',
          position: 'relative'
        }}>
          <Typography sx={{fontWeight: 'bold'}}>{commentInfo.writerId.name}</Typography>
          <Typography>{commentInfo.content}</Typography>
          <IconButton
            onClick={removeCommentOnConfirm}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              p: 0.5
            }}>
           <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Avatar src={commentInfo.writerId.image} alt="image" sx={{ml: 1}}/>
      </Box>

    : <Box sx={{display: 'flex' }}>
        <Avatar src={commentInfo.writerId.image} alt="image" sx={{mr: 1}}/>
        <Box sx={{
          p: 2,
          borderRadius: '1rem',
          backgroundColor: 'white',
          position: 'relative'
        }}>
          <Typography sx={{fontWeight: 'bold'}}>{commentInfo.writerId.name}</Typography>
          <Typography>{commentInfo.content}</Typography>
        </Box>
        <Box sx={{flexGrow: 1}}/>
      </Box>
  );
}

import React from "react";
import { removeComment } from "../../../../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useConfirmDialog } from "react-mui-confirm";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function SingleComment( {
  commentInfo,
  boardId,
	updateComment
}) {
  const confirm = useConfirmDialog();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
	
  const remove = () => {
    if (commentInfo.writerId._id === userData._id) {
      dispatch(removeComment({ commentId: commentInfo._id }))
      .then((response) => {
        if (response.payload.success) {
          updateComment(boardId);
        } else {
          alert("댓글 삭제에 실패하였습니다.");
        }
      });
    } else {
     alert("작성자가 아닙니다.");
    }
  }
  
  const removeCommentOnConfirm = () =>
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
    });

  return (
    <Box>
      <Typography>{commentInfo.writerId.name}</Typography>
      <Box sx={{display: 'flex'}}>
        <Avatar src={commentInfo.writerId.image} alt="image" />
        <Typography> {commentInfo.content}</Typography>
        <Button onClick={removeCommentOnConfirm} >
          <CloseOutlinedIcon />
          삭제하기
        </Button>
      </Box>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadComment, saveComment } from "../../../../../_actions/user_actions";
import { Box, Button, Divider, Input, Typography } from '@mui/material';
import SingleComment from "./SingleComment";


export default function Comment({
  boardInfo,
  refreshComment
}) {
  
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth.loginUserData);
  
  const [commentValue, setCommentValue] = useState("");
	const [commentList, setCommentList] = useState([]);
  
  
	const updateComment = (board_id) => {
    dispatch(loadComment({ boardId: board_id }))
    .then((response) => {
      if (response.payload.success) {
        setCommentList(response.payload.comments);
        //console.log(commentList);
      } else {
        alert("게시글 불러오기를 실패했습니다.");
      }
    });
	}

  const OnChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentValue,
      writerId: loginData._id,
      boardId: boardInfo._id,
    };
    dispatch(saveComment(variables))
    .then((response) => {
      if (response.payload.success) {
        setCommentValue("");
        updateComment(boardInfo._id);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };
  
  
  useEffect(() => {
    updateComment(boardInfo._id);
  }, [refreshComment]);
	
	return (
    <Box sx={{ '& > .MuiBox-root': {mt: 2} }}>
      <Typography sx={{mb: 1}}>댓글</Typography>
      <Divider sx={{borderColor: 'rgba(0, 0, 0, 0.7)'}}/>
      {commentList &&
        commentList.map((comment) => {
          if (comment.boardId === boardInfo._id) {
            return (
              <SingleComment
                key={comment._id}
                commentInfo={comment}
                boardId={boardInfo._id}
                updateComment={updateComment}
              />
            );
          }
        })
      }

      <form style={{ display: "flex", height: '3rem', marginTop: '2rem' }} onSubmit={onSubmit}>
        <Input
          sx={{ width: "100%", borderRadius: "5px" }}
          onChange={OnChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
          required
          multiline
          rows={2}
        />
        <br />
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
        >
          입력
        </Button>
      </form>
      
      
    </Box>
	);
}

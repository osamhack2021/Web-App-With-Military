import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBoard, loadComment, saveComment } from "../../../../../_actions/user_actions";
import { Box, Button, Divider, IconButton, Input } from '@mui/material';
import { useConfirmDialog } from 'react-mui-confirm';
import SingleComment from "./SingleComment";
import EditBoard from './EditBoard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Comment({
  groupInfo,
  boardInfo,
  refreshComment,
  updateBoard
}) {
  const confirm = useConfirmDialog();
  const dispatch = useDispatch();
  
  const loginData = useSelector((state) => state.auth.loginUserData);
  const [commentValue, setCommentValue] = useState("");
	const [commentList, setCommentList] = useState([]);
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
    updateBoard(groupInfo._id)
  }, [editMode]);
  
  useEffect(() => {
    updateComment(boardInfo._id);
  }, [refreshComment]);
	
	return (
    <Box>
      <p>댓글</p>
      <IconButton onClick={onClickEdit}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={(e) => { removeBoardOnConfirm(e, boardInfo) }} >
        <CloseOutlinedIcon />
      </IconButton>
      <Divider />
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

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <Input
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={OnChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
          multiline
          rows={2}
        />
        <br />
        <Button
          size="medium"
          onClick={onSubmit}
          variant="contained"
          color="primary"
        >
          입력
        </Button>
      </form>
      
      {editMode && (
        <EditBoard
          boardInfo={boardInfo}
          toggleEditMode={toggleEditMode}
        />
      )}
    </Box>
	);
}
